import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../../auth/helpers';
import { getStatus, listOfOrders, updateOrderStatus } from '../ApiAdmin';
import Layout from '../../core/Layout';
import moment from 'moment';

function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = (user, token) => {
    listOfOrders(user._id, token)
      .then((res) => setOrders(res))
      .catch((err) => console.log(err));
  };

  const loadStatus = (user, token) => {
    getStatus(user._id, token)
      .then((res) => {
        console.log(res);
        setStatus(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadOrders(user, token);
    loadStatus(user, token);
  }, []);

  const noOrdersMessage = () => {
    if (orders.length === 0) {
      return (
        <div className="alert alert-warning text-center my-5 display-3">
          No orders at the moment!
        </div>
      );
    } else {
      return (
        <div className="alert alert-info text-center my-5 display-3">
          Total orders: {orders.length}
        </div>
      );
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="form-group my-4">
        <label htmlFor={key}>{key}</label>
        <input
          id={key}
          value={value}
          readOnly
          type="text"
          className="form-control text-dark"
        ></input>
      </div>
    );
  };

  const handleStatus = (e, order) => {
    updateOrderStatus(user._id, token, order._id, e.target.value)
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        }
        loadOrders(user, token);
      });
  };

  const showStatus = (order) => {
    return (
      status.length && (
        <>
          <p>Status: {JSON.stringify(order.status)}</p>
          <select
            onChange={(e) => handleStatus(e, order)}
            className="form-control"
          >
            <option value="">Select Status</option>
            {status.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </>
      )
    );
  };

  const showOrders = () => {
    return (
      orders.length &&
      orders.map((order) => (
        <div className="my-3" key={order._id}>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Transaction ID</strong> {order.transaction_id}
            </li>

            <li className="list-group-item">
              <strong>Amount</strong> ${order.amount}
            </li>
            <li className="list-group-item">
              <strong>Status</strong> {order.status /*showStatus(order)*/}
            </li>
            <li className="list-group-item">
              <strong>Ordered on</strong> {moment(order.createdAt).fromNow()}
            </li>
            <li className="list-group-item">
              <strong>Shipping Address</strong> {order.address}
            </li>
          </ul>

          <div className="my-5">
            <h3 className="display-4 my-3">Total Products: {order.products.length}</h3>
            {order.products.map((product) => (
              <div key={product._id} className="card text-white bg-primary mb-3">
                <div className="card-header"> {product.name}</div>
                <div className="card-body">
                  {showInput('Product ID', product._id)}
                  {showInput('Product Name', product.name)}
                  {showInput('Product Price', product.price)}
                  {showInput('Product Quantity', product.count)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))
    );
  };

  return (
    <div>
      <Layout
        title="Orders"
        description="Manage orders"
        className="container"
      >
        <div className="row">
          <div className="col-md-6 mx-auto">
            {noOrdersMessage()}
            {showOrders()}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ListOrders;
