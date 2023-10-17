import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from './../actions/cartActions';
import { useDispatch } from 'react-redux';
import ShowImage from './ShowImage';
import moment from 'moment';
import './css/Card.css'
 
const Card = ({ product, showViewBtn = true }) => {
  let dispatch = useDispatch();

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="text-success">In Stock</span>
    ) : (
      <span className="text-danger">Out of Stock</span>
    );
  };

  return (
    <div className="product-card">
      <ShowImage item={product} url="product/photo" className="product-image" />

      <div className="product-details">
        <h4 className="product-title">{product.name}</h4>

        <div className="product-price">
          <span className="text-primary">${product.price}</span>
        </div>

        <div className="product-stock">
          {showStock(product.quantity)}
          <small className="text-muted d-block">Added {moment(product.createdAt).fromNow()}</small>
        </div>

        {showViewBtn && (
          <Link to={`/product/${product._id}`} className="btn btn-warning mt-3">
            View
          </Link>
        )}

        {product.quantity > 0 && (
          <button onClick={() => dispatch(addToCart(product))} className="btn btn-success mt-3">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
