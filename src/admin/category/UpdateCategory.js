import React, { useState, useEffect } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth/helpers';
import { updateCategory } from './../../core/ApiCore';
import { useLocation, useHistory } from 'react-router-dom';
import toastr from 'toastr';

const UpdateCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.search) {
      const categoryName = decodeURIComponent(location.search.split('=')[1]);
      setName(categoryName);
    }
  }, [location.search]);

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Get the category ID from the request
    const categoryId = location.pathname.split('/').pop();

    updateCategory(categoryId, user._id, token, { name })
      .then(data => {
        if (data.error) {
          setError(data.error);
          toastr.error('Error updating category', 'Error');
        } else {
          setError('');
          setSuccess(true);
          setName('');
          toastr.success('Category updated successfully', 'Success');
          // Redirect the user to the list of categories after the update
          history.push('/category/list');
        }
      });
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">Category updated</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Error updating category</h3>;
    }
  };

  const updateCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>New category name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Update Category</button>
    </form>
  );

  return (
    <Layout
      title="Update Category"
      description={`Hello ${user.name}, update the category here`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {updateCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
