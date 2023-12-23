// components/MoneyTransactionDialog.js
import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const MoneyTransactionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  head,
  address,
  information,
  Withdrawal,
}) => {
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter()
  const handleConfirmDeposit = () => {
    // Validate input and perform necessary actions
    onConfirm({ currency, amount });
    alert("Your deposit is been processed and will finally reflect after the first two (2) confirmations")
    //setTimeout(() => {
     // router.push("/home")
    //}, 2);
    onClose();
  };
  const handleConfirmWithdrawal = () => {
    // Validate input and perform necessary actions
    onConfirm({ currency, amount });
    alert("Your withdrawal is been processed and will finally reflect on your designated wallet address")
   withdrawMoney()
    onClose();
  };

  const withdrawMoney = () => {
    onAuthStateChanged(auth, async (user) => {
      if ( user ) {
        const uid = user.uid;
        let userData
        const userRef = doc(firestore, "users", user.uid);
        await getDoc(userRef).then( (x) => userData = x.data());
        console.log("data", userData);
        if (userData.accountBalance >= amount) {
          console.log("enough money");
          const newBalance = userData.accountBalance - amount
          await updateDoc(userRef, {  accountBalance: newBalance }).then(() =>
            router.push("/home")
          );
        } else {
          alert("Insufficient funds");
        }
      } else {
        alert("no user logged in")
        router.push("/")
      }
    });
    // router.push("/signup")
  };

  const handleCopyClick = () => {
    // Copy to clipboard logic
    if (address == null) return;
    navigator.clipboard.writeText(address);
    setIsCopied(true);

    // Reset isCopied state after a delay (for demonstration purposes)
    setTimeout(() => {
      setIsCopied(false);
    }, 4000); // Reset after 2 seconds
    // You can add feedback, for example, changing the button text temporarily
  };

  console.log(Withdrawal);

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
        {Withdrawal && ( () => {
        if (head == "Local Bank"){
        return(<div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold my-2"
            >
              Account Name
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded-md"
              //value={wallet}
              //onChange={(e) => setWallet(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold my-2"
            >
              Account Number
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded-md"
             // value={wallet}
              //onChange={(e) => setWallet(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold my-2"
            >
              Bank Name
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded-md"
              //value={wallet}
             // onChange={(e) => setWallet(e.target.value)}
              required
            />
          </div>
          </div>
          );
          
        }else{
        return(
          <div>
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
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              required
            />
          </div>);

        }
})()}

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
        {!Withdrawal
          ? "The amount entered above will be sent directly to your wallet address"
          : "Please sent your amount to the address below and your account will be updated in less than 10 minutes"}
        <br />
        If you need any help, do ensure to contact our customer support
      </div>
      {Withdrawal ? (
        <div> </div>
      ) : (
        <div  className="flex justify-between items-center">
          <p
            onClick={handleCopyClick}
            className="flex justify-between items-center relative my-2 py-2 px-4 overflow-auto text-sm rounded-lg bg-green-300 font-semibold border-black"
          >
            {address}
            {/* <button
            onClick={handleCopyClick}
            className=" text-right  ml-4 px-3 py-1 bg-green-600 text-white rounded-md transition-transform transform hover:scale-110 focus:outline-none"
          >
           {isCopied ? 'Copied' : 'Copy'}
          </button> */}
          </p>
          <motion.button
            onClick={handleCopyClick}
            className={`right-0 ml-2 px-3 py-1 rounded-md focus:outline-none ${
              isCopied ? "bg-green-600" : "bg-green-500"
            } text-white`}
            initial={{ scale: 1 }}
            animate={{ scale: isCopied ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {isCopied ? "Copied" : "Copy"}
          </motion.button>
        </div>
      )}
      <button
        onClick={() => Withdrawal ? handleConfirmWithdrawal() : handleConfirmDeposit()}
        className="bg-green-500 my-4 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 focus:outline-none"
      >
        Confirm
      </button>
    </Modal>
  );
};

export default MoneyTransactionDialog;
