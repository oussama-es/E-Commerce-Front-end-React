import React from 'react';
import Modal from 'react-modal';
import toastr from 'toastr'; // Import toastr
import './confirmation-modal.css'; // Import the CSS file

Modal.setAppElement('#root'); // Set the app element for modal accessibility

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="confirmation-modal">
      <div className="modal-content">
        {/* Existing modal content */}
        <div className="modal-content">
          <p>Do you really want to delete this category?</p>
        </div>
      </div>
      <div className="confirmation-content">
        <p>Do you really want to delete this category?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose} className="cancel">
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
