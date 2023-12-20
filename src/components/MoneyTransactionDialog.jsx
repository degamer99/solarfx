// components/MoneyTransactionDialog.js
import React, { useState } from "react";
import Modal from "react-modal";

const MoneyTransactionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  head,
  address,
  information,
  Withdrawal
}) => {
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");

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
          <span className="text-3xl">&times;</span>
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-4">{head} Transaction</h2>
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
        <div>
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
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
          {   true && <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold my-2"
            >
              Wallet Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>}

        {/* {information.map((value, index) => {
          return (
            <div key={index}>
              <label
                htmlFor="value"
                className="block text-gray-700 font-bold mb-2"
              >
                {value}
              </label>
              <input
                type="text"
                id="value"
                className="w-full p-2 border rounded-md"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          );
        })} */}
      </div>
      <div className="font-bold text-gray-600 ">

        { Withdrawal ? "The amount entered above will be sent directly to your wallet address" : "Please sent your amount to the address below and your account will be updated in less than 10 minutes"}
        <br />
        If you need any help, so ensure to contact our customer support
      </div>
      {Withdrawal ? <p> </p> :<p className=" my-2 py-2 px-4 overflow-auto text-sm rounded-lg bg-green-300 font-semibold border-black">
        {address}
      </p>} 
      <button
        onClick={handleConfirm}
        className="bg-green-500 my-4 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 focus:outline-none"
      >
        Confirm
      </button>
    </Modal>
  );
};

export default MoneyTransactionDialog;
