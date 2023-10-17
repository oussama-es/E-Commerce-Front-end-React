import React, { useEffect, useState } from 'react';
import { getOneProduct, relatedProducts } from './ApiCore';
import Layout from './Layout';
import Card from './Card';
import moment from 'moment';
import ShowImage from './ShowImage';
import { useDispatch } from 'react-redux'; // Importez useDispatch
import { addToCart } from '../actions/cartActions'; // Importez addToCart

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const dispatch = useDispatch(); // Obtenez la fonction dispatch

    useEffect(() => {
        let productId = props.match.params.id;
        getOneProduct(productId)
            .then((res) => {
                setProduct(res);
                return relatedProducts(productId);
            })
            .then((related) => setRelated(related))
            .catch((err) => console.error(err));
    }, [props]);

    const handleAddToCart = () => {
        // Utilisez la fonction dispatch pour ajouter le produit au panier
        dispatch(addToCart(product));
    };

    return (
        <div>
            {product && product.description && (
                <Layout
                    title="Product Details"
                    className="container"
                >
                    <div className="row">
                        <div className="col-md-6">
                            <ShowImage item={product} url="product/photo" className="product-image" />
                        </div>
                        <div className="col-md-6">
                            <h2> {product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category && product.category.name}</p>
                            <p>Added {moment(product.createdAt).fromNow()}</p>
                            {product.quantity > 0 && (
                                <button onClick={handleAddToCart} className="btn btn-success mt-3">
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                    <hr />
                    <h2>Related Products</h2>
                    <div className="row">
                        {related.map((product, i) => (
                            <div key={product._id} className="col-md-4">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                </Layout>
            )}
        </div>
    );
};

export default Product;
