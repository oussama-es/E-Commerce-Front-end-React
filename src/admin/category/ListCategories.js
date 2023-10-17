import React, { useState, useEffect } from 'react';
import Layout from './../../core/Layout';
import { isAuthenticated } from './../../auth/helpers';
import { getCategories, deleteCategory } from './../../core/ApiCore';
import { useHistory } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import toastr from 'toastr';

const ListCategories = () => {
  const { user, token } = isAuthenticated();
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  const handleUpdateCategory = (categoryId, categoryName) => {
    history.push(`/category/update/${categoryId}?name=${categoryName}`);
  };

  const handleOpenModal = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setCategoryIdToDelete(null);
    setModalIsOpen(false);
  };

  const handleConfirmDelete = () => {
    if (categoryIdToDelete) {
      deleteCategory(categoryIdToDelete, user._id, token)
        .then((data) => {
          if (data && data.error) {
            toastr.error('Error deleting category');
          } else {
            toastr.success('Category deleted successfully');
            const updatedCategories = categories.filter(
              (category) => category._id !== categoryIdToDelete
            );
            setCategories(updatedCategories);
          }
        })
        .catch((err) => {
          console.error(err);
          toastr.error('An error occurred while deleting the category');
        });
    }

    handleCloseModal();
  };

  return (
    <Layout
      title="List of Categories"
      description={`Welcome ${user.name}, here is the list of categories`}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2 ListCategories">
          <h2>List of Categories</h2>
          <ul className="list-group">
            {categories.map((category, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {category.name}
                <div>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleUpdateCategory(category._id, category.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleOpenModal(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Confirmation modal */}
      <ConfirmationModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </Layout>
  );
};

export default ListCategories;
