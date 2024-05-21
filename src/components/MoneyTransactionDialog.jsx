// components/MoneyTransactionDialog.js
import React, { useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore, storage, upload } from "@/components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import FileInput from "./FileInpit";
import { useAuth } from "./AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const MoneyTransactionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  head,
  address,
  information,
  Withdrawal,
  upgrade,
  // amount,
  // setAmount,
}) => {
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const [alertClosed, setAlertClosed] = useState(false);

  const handleClick = async (limit = "$500") => {
    await showAlert(`The amount you wish to withdraw exceeds your maximum withdrawal limit of ${limit} . Please upgrade your withdrawal limit to continue`)
    console.log('Closed');
    setAlertClosed(true);
    router.push("withdrawalupgrade")
  };

  const showAlert = (message) => {
    return new Promise((resolve) => {
      alert(message);
      resolve();
    });
  };

  const handleConfirmDeposit = () => {
    // Validate input and perform necessary actions
    onConfirm({ currency, amount });
    console.log(amount);
    upgrading(amount, "deposit");
    alert(
      "Your deposit is been processed and will finally reflect after the first two (2) confirmations"
    );
    //setTimeout(() => {
    // router.push("/home")
    //}, 2);
    onClose();
  };

  const upgrading = async (amount, type, img, address) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let userData;
        const userRef = doc(firestore, "users", user.uid);
        if (type == "deposit") {
          await updateDoc(userRef, {
            pending: true,
            pendingType: type,
            pendingAmount: amount,
          });
        } else {
          await updateDoc(userRef, {
            pending: true,
            pendingType: type,
            pendingAmount: amount,
            pendingAddress: address,
          });
        }
      } else {
        console.log("no user logged in");
      }
    });
    // router.push("/signup")
  };

  const handleConfirmWithdrawal = () => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log("ther is a user", uid);
          const userRef = doc(firestore, "users", user.uid);
          try {
            await getDoc(userRef).then((file) => {
              console.log(file.data())
              const { withdrawalLimit } = { ...file.data() }

              // Validate input and perform necessary actions
              onConfirm({ currency, amount });
              console.log(amount, wallet);
              if (withdrawalLimit != undefined) {
                console.log("Withdrawl Limit", withdrawalLimit)
                if (amount >= withdrawalLimit) {
                  handleClick(`$${withdrawalLimit}`)
                } else {
                upgrading(amount, "withdraw", "", wallet);
                alert(
                  "Your withdrawal is been processed and will finally reflect on your designated wallet address"
                );
                withdrawMoney();
                onClose();

              }

              } else {
                if (amount >= 500) {
                  handleClick()
                } else {
                upgrading(amount, "withdraw", "", wallet);
                alert(
                  "Your withdrawal is been processed and will finally reflect on your designated wallet address"
                );
                withdrawMoney();
                onClose();

              }
              }

               


              // if (file.data().email == "admin@gmail.com") router.push("/secret")
            })
          } catch (err) {
            console.log(err);
          }
          // finally {
          //   if (userData != null && userData.email == "admin@gmail.com") {
          //     console.log("admin is in control")
          //     router.push("/secret");
          //   }
          // }
          // ...b
          console.log("done");
          // console.log("this is user Data", userData)
        } else {
          // User is signed out
          // ...
          console.log("ther is no user");
          router.push("/signin");
        }
      });
    } catch (error) {
      console.log(error);
    }

  };

  const withdrawMoney = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let userData;
        const userRef = doc(firestore, "users", user.uid);
        await getDoc(userRef).then((x) => (userData = x.data()));
        console.log("data", userData);
        if (userData.accountBalance >= amount) {
          console.log("enough money");
          const newBalance = userData.accountBalance - amount;
          await updateDoc(userRef, { accountBalance: newBalance }).then(() =>
            router.push("/home")
          );
        } else {
          alert("Insufficient funds");
        }
      } else {
        alert("no user logged in");
        router.push("/");
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

  const onFileChange = async (file) => {
    console.log(user.uid);
    const userRef = doc(firestore, "users", user.uid);

    const confirmRef = ref(storage, "confirm", user.uid);
    uploadBytes(confirmRef, file).then(async (snapshot) => {
      // console.log("snapshot", snapshot);
      let link = await getDownloadURL(confirmRef);

      console.log(link);

      await updateDoc(userRef, { pendingImage: link }).then(() =>
        console.log("File stuff has been done")
      );
    });
    // onAuthStateChanged(auth, async (user) => {
    //   const userRef = doc(firestore, "users", user.uid);
    //    try {
    //     await upload(file, user.uid).then( (link) => {
    //       console.log(link)
    //     })

    //     //  console.log(fileLink)
    //     //  await updateDoc(userRef, {pendingImage: `${fileLink}`}).then( () => {
    //     //    console.log("Fle has to be Uploaded")
    //     //  })
    //    } catch (error) {
    //     console.log(error)
    //    }

    //   // await upload(file, user.uid).then( async (link) => {
    //   //   console.log(link)
    //   //   await updateDoc(userRef, { pendingImage: `${link}` }).then(() =>
    //   //   console.log("File has been Uploaded")
    //   // );

    //   // })
    // })
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
            Amount {upgrade ? ": 4% of total profit made" : " "}
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
        {Withdrawal &&
          (() => {
            if (head == "Local Bank") {
              return (
                <div>
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
            } else {
              return (
                <div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-gray-700 font-bold my-2"
                    >
                      Fee
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full p-2 border rounded-md bg-gray-300"
                      value={(amount * 0.1).toFixed(1)}
                    />
                    <p>
                      {" "}
                      Pay the 10% processing fee to instantly withdraw from your
                      account
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
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
                      className={`right-0 ml-2 px-3 py-1 rounded-md focus:outline-none ${isCopied ? "bg-green-600" : "bg-green-500"
                        } text-white`}
                      initial={{ scale: 1 }}
                      animate={{ scale: isCopied ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </motion.button>
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-gray-700 font-bold my-2"
                    >
                      Your Wallet Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="w-full p-2 border rounded-md"
                      value={wallet}
                      onChange={(e) => setWallet(e.target.value)}
                      required
                    />
                  </div>
                </div>
              );
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
        {Withdrawal
          ? "The amount entered above will be sent directly to your wallet address"
          : "Please send your amount to the address above and your account will be updated in less than 10 minutes"}
        <br />
        If you need any help, do ensure to contact our customer support
      </div>
      {Withdrawal ? (
        <div> </div>
      ) : (
        <div className="flex justify-between items-center">
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
            className={`right-0 ml-2 px-3 py-1 rounded-md focus:outline-none ${isCopied ? "bg-green-600" : "bg-green-500"
              } text-white`}
            initial={{ scale: 1 }}
            animate={{ scale: isCopied ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {isCopied ? "Copied" : "Copy"}
          </motion.button>
        </div>
      )}
      {upgrade ? <p className="my-3 font-bold">Please upload a clear photo of you holding your government issued Id-card</p> : <p> </p>
      }
      <FileInput onFileChange={onFileChange} />
      <button
        onClick={() =>
          Withdrawal ? handleConfirmWithdrawal() : handleConfirmDeposit()
        }
        className="bg-green-500 my-4 text-white py-2 px-4 rounded font-semibold hover:bg-blue-600 focus:outline-none"
      >
        Confirm
      </button>
    </Modal>
  );
};

export default MoneyTransactionDialog;
