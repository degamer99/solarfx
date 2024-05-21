import CopyrightFooter from "@/components/Copyright";
// import { firestore } from "@/components/Firebase";
import HeaderDash from "@/components/HeaderDash";
import SidebarHome from "@/components/SidebarHome";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/components/Firebase";
import { useRouter } from "next/router";
import CollapsibleDataSection from "@/components/CollapsibleSection";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
// import { doc, getDoc, updateDoc } from "firebase/firestore";


const Secret = () => {
  const [AllUserData, setAllUserData] = useState([]);

  const [editedData, setEditedData] = useState([]);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleInputChange = (index, key, value, ogvalue) => {
    console.log("handling input change");
    const newData = [...editedData];
    if (value == "") {
      newData[index] = { ...newData[index], [key]: ogvalue };
    } else {
      newData[index] = { ...newData[index], [key]: value };
    }
    setEditedData(newData);
  };

  const handleUpdate = async (index, id) => {
    // You can use the edited data in the 'editedData' state
    const updatedInfo = editedData[index];
    console.log(updatedInfo);
    // try {
    //   const userRef = doc(firestore, "users", id);
    //   await updateDoc(userRef, updatedInfo).then(() => {
    //     console.log("Updated Information:", updatedInfo, id);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // Perform your update logic here
  };

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    // const userRef = doc(firestore, "users", user.uid);
    const getUserAuthInfo = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("ther is a user", uid);
            if (uid != "fbHlaAd9V5SSp6AamRKW5996tOk1") router.push("/home");
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
            router.push("/");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserAuthInfo();

    const getAllUserData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        // console.log(doc.id)
        let docData = { ...doc.data(), id: doc.id };
        const {
          firstName,
          lastName,
          email,
          password,
          accountBalance,
          tradingAmount,
          accountLevel,
          totalProfit,
          pending,
          pendingType,
          pendingAmount,
          pendingtradingAmount,
          pendingAddress,
          pendingImage,
          id, 
          withdrawalLimit
        } = docData;
        // // // const data ={
        //   // logins: {email, password}
        //   AccountInformation: {accountBalance, accountLevel, tradingAmount, totalProfit}
        //   Pending: { pending, pendingType, pendingAmount, pendingAddress}
        //   SendEmail:
        // // }
        setAllUserData((x) => [
          ...x,[ firstName, lastName,{
            Logins: { email, password },
            AccountInformation: {
              accountBalance,
              accountLevel,
              tradingAmount,
              totalProfit,
              withdrawalLimit,
            },
            Pending: {
              pending,
              pendingType,
              pendingAmount,
              pendingAddress,
              pendingImage
            },
            SendEmail: {
              CustomizeDefault: "type your message"

              // Your email data here
            },
          }, id],
        ]);
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
      // console.log("all data", AllUserData)
    };
    getAllUserData();
  }, [router.isReady]);



  const Field = ({ name, value, key, editedData, index }) => {
    return (
      <div>
        <label
          htmlFor={name}
          className="block capitalize font-semibold text-lg mt-3 text-gray-700"
        >
          {name}:
        </label>
        <input
          type="text"
          id={name}
          name={name}
          value={
            editedData[index]?.[key] === value ? "" : editedData[index]?.[key]
          }
          // value={value}
          onChange={(e) => handleInputChange(index, key, e.target.value, value)}
          // onChange={onChange}
          className="w-full px-3 py-2 border rounded font-semibold focus:outline-none focus:ring focus:border-blue-300"
          readOnly
        />
      </div>
    );
  };

  return (
    <>
      <HeaderDash onOpen={handleOpenSidebar} />
      <SidebarHome isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      {/* {AllUserData.map} */}
      <main className="mt-4">
        {AllUserData.map((item, index) => (
          <section
            key={index}
            className="mx-4  rounded p-6 my-8"
            style={{
              boxShadow: "0 0 30px #ddddddaa",
              backgroundColor: "white",
            }}
          >
            {/* {console.log(item)} */}
            <h2 className="font-bold text-2xl mb-8">
              User: {item[0] + " " + item[1]}
            </h2>
            <CollapsibleDataSection data={item[2]} id={item[3]} name={item[0] + " " + item[1]} />
            </section>))}
      </main>
      <CopyrightFooter />
    </>
  );
};

export default Secret;
