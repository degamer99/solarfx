// Modal.js
import { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const CustomModal = ({ isOpen, closeModal, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyles}
    >
      <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        <form>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 capitalize font-bold text-lg">{key}</label>
              <div className="bg-gray-100 p-2 rounded">{value}</div>
            </div>
          ))}
        </form>
        <button onClick={closeModal} className="bg-gray-800 text-white py-2 px-4 rounded mt-4">
          Close
        </button>
      </div>
    </Modal>
  );
};

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    height: "600px",
    maxHeight: "80vh",
    width: '400px',
    maxWidth: '90%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 30,
  },
};

export default CustomModal;
