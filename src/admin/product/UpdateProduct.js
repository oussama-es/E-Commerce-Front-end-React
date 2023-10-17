import React, { useState, useEffect } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth/helpers';
import { getOneProduct, updateProduct, getCategories } from './../../core/ApiCore';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    shipping: false,
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const productId = match.params.productId;
    getOneProduct(productId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          toastr.error('Error fetching the product', 'Error');
        } else {
          setProduct(data);
        }
      });

    getCategories()
      .then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          setCategories(data);
        }
      });
  }, [match.params.productId]);

  const handleChange = (e) => {
    setError('');
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    updateProduct(match.params.productId, user._id, token, product)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          toastr.error('Error updating the product', 'Error');
        } else if (data.success) {
          setError('');
          setSuccess(true);
          toastr.success('The product has been updated successfully', 'Success');
        }
      });
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">The product has been updated</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Error updating the product</h3>;
    }
  };

  const updateProductForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={product.name}
          name="name"
          autoFocus
          required
        />
      </div>
      <div className="form-group">
        <label>Product Description</label>
        <textarea
          className="form-control"
          onChange={handleChange}
          value={product.description}
          name="description"
          rows="4"
          required
        />
      </div>
      <div className="form-group">
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange}
          value={product.price}
          name="price"
          required
        />
      </div>
      <div className="form-group">
        <label>Quantity in Stock</label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange}
          value={product.quantity}
          name="quantity"
          required
        />
      </div>
      <div className="form-group">
        <label>Product Category</label>
        <select
          className="form-control"
          onChange={handleChange}
          value={product.category._id} // Set the value to the product's category ID
          name="category"
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category._id}>
              {category.name} {/* Display the category name */}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Available for Shipping</label>
        <select
          className="form-control"
          onChange={handleChange}
          value={product.shipping}
          name="shipping"
          required
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Update Product</button>
    </form>
  );

  return (
    <Layout
      title="Update Product"
      description={`Hello ${user.name}, update the product here`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {updateProductForm()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;


/*
import React, { useState, useEffect } from 'react';
import Layout from './../../core/Layout';
import { API_URL } from './../../config';
import { isAuthenticated } from './../../auth/helpers';
import toastr from 'toastr';
import 'toastr/build/toastr.css';

function UpdateProduct({ match }) {
  const { user, token } = isAuthenticated();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    shipping: false,
    photo: null, // Ajout de l'état pour la photo
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const productId = match.params.productId;
    getProduct(productId);
    getCategories();
  }, [match.params.productId]);

  const getProduct = (productId) => {
    fetch(`${API_URL}/product/${productId}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          setProduct(data); // Mettre à jour l'état du produit avec les données reçues
        }
      })
      .catch((err) => {
        toastr.error(err, 'Server error!', {
          positionClass: 'toast-bottom-left',
        });
      });
  };

  const getCategories = () => {
    fetch(`${API_URL}/category`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => setCategories(res.categories))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const val = type === 'file' ? files[0] : value;
    setProduct({ ...product, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }

    fetch(`${API_URL}/product/${match.params.productId}/${user._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toastr.error(data.error);
        } else {
          toastr.success(`Product ${data.name} updated`, 'Product Updated', {
            positionClass: 'toast-bottom-left',
          });
        }
      })
      .catch((err) => {
        toastr.error(err, 'Server error!', {
          positionClass: 'toast-bottom-left',
        });
      });
  };

  return (
    <div>
      <Layout
        title="Update Product"
        description={`Hello ${user.name}, update the product here`}
        className="container"
      >
        <div className="row">
          <div className="col-md-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="photo">Product Photo</label>
                <input
                  onChange={handleChange}
                  id="photo"
                  type="file"
                  className="form-control-file"
                  name="photo"
                  accept="image/*"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name" className="text-muted">
                  Name
                </label>
                <input
                  value={product.name} // Utiliser la valeur du produit reçue
                  onChange={handleChange}
                  name="name"
                  required
                  autoFocus
                  placeholder="Add name of Product"
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  value={product.description} // Utiliser la valeur du produit reçue
                  onChange={handleChange}
                  name="description"
                  rows="2"
                  className="form-control"
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  value={product.quantity} // Utiliser la valeur du produit reçue
                  onChange={handleChange}
                  name="quantity"
                  type="number"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  value={product.price} // Utiliser la valeur du produit reçue
                  onChange={handleChange}
                  name="price"
                  type="number"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  value={product.category} // Utiliser la valeur du produit reçue
                  onChange={handleChange}
                  name="category"
                  className="form-control"
                >
                  <option value="">Select a category</option>
                  {categories &&
                    categories.map((category, i) => (
                      <option key={i} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="shipping">Shipping</label>
                <select
                  value={product.shipping} // Utiliser la valeur du produit reçue
                  onChange={handleChange}
                  name="shipping"
                  className="form-control"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <button className="my-5 btn-block btn btn-outline-primary">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UpdateProduct;
*/