import React, { useState, useEffect } from 'react';
import Layout from '../../core/Layout';
import { isAuthenticated } from '../../auth/helpers';
import { getProducts, deleteProduct } from '../../core/ApiCore'; // Make sure to import the functions
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Card from '../../core/Card'; // Import the Card component
import { useHistory } from 'react-router-dom';

const ListProducts = () => {
  const { user, token } = isAuthenticated();
  const [products, setProducts] = useState([]);
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [deletedProductId, setDeletedProductId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [updatedProduct, deletedProductId]);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        toastr.error(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const history = useHistory();

  const handleUpdateProduct = (productId) => {
    history.push(`/admin/product/update/${productId}`);
  };

  const handleOpenDeleteModal = (productId) => {
    history.push(`/admin/product/delete/${productId}`);
  };

  return (
    <Layout
      title="List of Products"
      description={`Welcome ${user.name}, here is the list of products`}
      className="container"
    >
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Card product={product} showViewBtn={false} /> {/* Use the Card component */}
            <div className="mb-3">
              <button onClick={() => handleUpdateProduct(product._id)} className="btn btn-primary mr-6">
                Edit
              </button>
              <button onClick={() => handleOpenDeleteModal(product._id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Display the delete confirmation dialog here */}
    </Layout>
  );
};

export default ListProducts;
