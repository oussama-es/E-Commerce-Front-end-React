import React, { useState, useEffect } from 'react';
import { emptyCart, isAuthenticated } from './../auth/helpers';
import { Link } from 'react-router-dom/';
import { createOrder, getBraintreeToken, processPayment } from './ApiCore';
import DropIn from 'braintree-web-drop-in-react';
import toastr from 'toastr';
import "toastr/build/toastr.css";

function Checkout({ products }) {

    const [data, setData] = useState({
        braintreeToken: null,
        error: null,
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
        getBraintreeToken(userId, token)
            .then(res => setData({ ...data, braintreeToken: res.token }))
            .catch(err => setData({ ...data, error: err }));
    }, []);

    const totalToCheckout = (products) => {
        return products.reduce((total, product) => total + (product.count * product.price), 0);
    }

    const dropIn = () => {
        return (
            <div>
                {data.braintreeToken !== null && products.length > 0 && (
                    <DropIn
                        options={{
                            authorization: data.braintreeToken
                        }}
                        onInstance={instance => data.instance = instance}
                    />
                )}
            </div>
        );
    }

    const buy = () => {
        const deliveryAddress = data.address;
        data.instance.requestPaymentMethod()
            .then(data => {
                let paymentData = {
                    amount: totalToCheckout(products),
                    paymentMethodNonce: data.nonce
                };
                processPayment(userId, token, paymentData)
                    .then(res => {
                        let orderData = {
                            products,
                            transaction_id: res.transaction.id,
                            amount: res.transaction.amount,
                            address: deliveryAddress
                        }
                        createOrder(userId, token, orderData)
                            .then(res => {
                                emptyCart(() => {
                                    toastr.success('Payment Successful', 'Valid', {
                                        positionClass: 'toast-bottom-left'
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => {
                        console.error(err);
                        toastr.error('Payment Failed', 'Invalid', {
                            positionClass: 'toast-bottom-left'
                        });
                    });
            })
            .catch(err => {
                console.error(err);
                toastr.error('Payment Failed', 'Invalid', {
                    positionClass: 'toast-bottom-left'
                });
            });
    };

    const showBtnCheckout = () => {
        if (isAuthenticated()) {
            return (
                <>
                    {dropIn()}
                    <button onClick={buy} className="btn btn-success">Pay</button>
                </>
            )
        }
        return (
            <Link to="/signin">
                <button className="btn btn-warning btn-block">Sign in to Checkout</button>
            </Link>
        )
    }

    const handleInput = (e) => {
        setData({ ...data, address: e.target.value }); // Utilisation de data.address ici
    }

    return (
        <div>
            <h2 className="text-center">Total <span className="badge badge-success">{totalToCheckout(products)}</span> :</h2>
            <label htmlFor="address">Delivery Address</label> {/* Correction de la faute de frappe : adress => address */}
            <textarea className="form-control" onChange={handleInput} name="address" rows="2"></textarea>
            {showBtnCheckout()}
        </div>
    );
}

export default Checkout;
