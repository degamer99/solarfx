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
// import { doc, getDoc, updateDoc } from "firebase/firestore";

const Secret = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const [AllUserData, setAllUserData] = useState([]);
  const [editedData, setEditedData] = useState([]);

  const handleInputChange = (index, key, value, ogvalue) => {
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
    try {
      const userRef = doc(firestore, "users", id);
      await updateDoc(userRef, updatedInfo).then(() => {
        console.log("Updated Information:", updatedInfo, id);
      });
    } catch (error) {
      console.log(error);
    }
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
        let docData = { ...doc.data() };
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
          pendingAddress,
        } = docData;
        setAllUserData((x) => [
          ...x,
          {
            id: doc.id,
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
            pendingAddress,
          },
        ]);
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
      // console.log("all data", AllUserData)
    };
    getAllUserData();
  }, [router.isReady]);

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
            style={{ boxShadow: "0 0 30px #ddddddaa", backgroundColor: item.pending == true ? "#ff1111" : "white" }}
          >{
            console.log(item)
          }
            <h2 className="font-bold text-2xl ">User Information</h2>
            <form className="space-y-4">
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  {}
                  <label
                    htmlFor={key}
                    className="block capitalize font-semibold text-lg mt-3 text-gray-700"
                  >
                    {key}
                  </label>
                  <input
                    type={
                      typeof value === "string"
                        ? "text"
                        : typeof value === "boolean"
                        ? "boolean"
                        : "number"
                    }
                    id={key}
                    name={key}
                    placeholder={`${value}`}
                    value={
                      editedData[index]?.[key] === value
                        ? ""
                        : editedData[index]?.[key]
                    }
                    onChange={(e) =>
                      handleInputChange(index, key, e.target.value, value)
                    }
                    className="w-full px-3 py-2 border rounded font-semibold focus:outline-none focus:ring focus:border-blue-300"
                    readOnly={key == "id"}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleUpdate(index, item.id)}
                className="px-4 py-2 bg-green-500 rounded-lg font-semibold text-white"
              >
                Update
              </button>
            </form>
          </section>
        ))}
        {/* {AllUserData.map((item, index) => (
          <section key={index} className="bg-white mx-4 rounded p-6 my-8"
          style={{boxShadow: "0 0 30px #ddddddaa"}}>
            <h2 className="font-bold text-2xl ">User Information</h2>
            <form className="space-y-4">
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block capitalize font-semibold text-lg mt-3 text-gray-700">{key}</label>
                  <input
                    type={typeof value === 'string' ? 'text' : 'number'}
                    id={key}
                    name={key}
                    defaultValue={value}
                    onChange={}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    // readOnly
                  />
                </div>
              ))}
              <button className="px-4 py-2 bg-green-500 rounded-lg font-semibold text-gray-400"> Update </button>
            </form>
          </section>
        ))} */}
      </main>
      <CopyrightFooter />
    </>
  );
};

export default Secret;
