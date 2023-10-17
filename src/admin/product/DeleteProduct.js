import React, { useState, useEffect } from 'react';
import Layout from '../../core/Layout';
import { isAuthenticated } from '../../auth/helpers';
import { getOneProduct, deleteProduct } from '../../core/ApiCore';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Redirect, useHistory } from 'react-router-dom';

const DeleteProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [product, setProduct] = useState({});
  const [redirect, setRedirect] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const productId = match.params.productId;
    getOneProduct(productId)
      .then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          setProduct(data);
        }
      });
  }, [match.params.productId]);

  const deleteConfirmed = () => {
    const user = isAuthenticated().user;

    if (!isAuthenticated() || user.role !== 1) {
      toastr.error("You are not authorized to delete this product.", 'Authorization Error');
      history.push('/');
      return;
    }

    const productId = match.params.productId;
    deleteProduct(productId, user._id, token)
      .then((data) => {
        if (data.error) {
          toastr.error(data.error, 'Error deleting the product');
        } else {
          toastr.success('The product has been deleted successfully', 'Success');
          history.push('/product/list');
        }
      })
      .catch((error) => {
        console.error(error);
        toastr.error('An error occurred while deleting the product.');
      });
  };

  const redirectToProducts = () => {
    if (redirect) {
      return <Redirect to="/product/list" />;
    }
  };

  return (
    <Layout
      title="Delete Product"
      description={`Hello ${user.name}, do you really want to delete this product?`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {redirectToProducts()}
          <h2>Delete Product</h2>
          <p>{product.name}</p>
          <button onClick={deleteConfirmed} className="btn btn-danger">
            Confirm Deletion
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DeleteProduct;
