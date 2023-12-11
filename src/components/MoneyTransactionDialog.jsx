// components/MoneyTransactionDialog.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const MoneyTransactionDialog = ({ isOpen, onClose, onConfirm }) => {
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');

  const handleConfirm = () => {
    // Validate input and perform necessary actions
    onConfirm({ currency, amount });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Money Transaction Dialog"
    >
      <div className="flex justify-end">
        <button onClick={onClose} className="text-gray-500 p-2">
          <span className='text-3xl'>&times;</span>
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Money Transaction</h2>
      {/* <div className="mb-4">
        <label htmlFor="currency" className="block text-gray-700 font-bold mb-2">
          Currency
        </label>
        <input
          type="text"
          id="currency"
          className="w-full p-2 border rounded-md"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        />
      </div> */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="w-full p-2 border rounded-md"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className='font-bold text-gray-600 '>
        Please sent your amount to the address below and your account will be updated in less than 10 minutes
      </div>
      <p>
        
      </p>
      <button
        onClick={handleConfirm}
        className="bg-green-500 my-4 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 focus:outline-none"
      >
        Confirm
      </button>
    </Modal>
  );
};

export default MoneyTransactionDialog;
