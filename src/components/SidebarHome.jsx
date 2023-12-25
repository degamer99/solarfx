import { useRouter } from "next/router";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimBtn";
import Logo from "./Logo";
import Link from "next/link";
// import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, firestore } from "./Firebase";
import { useState } from "react";
import CustomModal from "../components/Modal";
// import { auth, firestore } from "../components/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

const Sidebar = ({ isOpen, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  // const userData = {
  //   accountBalance: 300,
  //   accountLevel: 'Beginner a/c',
  //   Password: 'olayinka2002',
  //   email: 'olayinkabello962@gmail.com',
  //   firstName: 'Olayinka',
  //   lastName: 'Bello',
  //   password: 'olayinka2002',
  //   phoneNumber: '09039596798',
  //   totalProfit: 0,
  // };
  const openModal = () => {
    onClose();
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleButtonClick = () => {
    // Handle button click logic
    console.log("Button clicked!");
  };
  const data = [
    {
      name: "Dashboard",
      click: function click() {
        router.push("/home");
      },
    },
    {
      name: "Deposit",
      click: function click() {
        router.push("/deposit");
      },
    },
    {
      name: "Withdrawal",
      click: function click() {
        router.push("/withdraw");
      },
    },
    {
      name: "Trade",
      click: function click() {
        router.push("/trade");
      },
    },

    // Added new idebar menu

    {
      name: "Account Upgrade",
      click: function click() {
        router.push("/accountupgrade");
      },
    },
    {
      name: "Profile",
      click: async function profile() {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userRef = doc(firestore, "users", user.uid);
            try {
              await getDoc(userRef)
                .then((file) => {
                  let disintergrate = { ...file.data() };
                  const {
                    firstName,
                    lastName,
                    email,
                    password,
                    accountBalance,
                    accountLevel,
                  } = disintergrate;
                  setUserData({
                    firstName,
                    lastName,
                    email,
                    password,
                    accountBalance,
                    accountLevel,
                  });
                })
                .then(() => openModal());
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("No user logged in");
          }
        });
      },
    },
    // { name: "Settings", to: "/settings" },
    {
      name: "Logout",
      click: async function click(e) {
        try {
          e.preventDefault();
          await signOut(auth).then(() => router.push("/"));
          // Successful logout, you can redirect or perform other actions

          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      },
    },
  ];
  const router = useRouter();

  const signup = (e) => {
    e.preventDefault();
    router.push("/signup");
  };
  const signin = (e) => {
    e.preventDefault();
    router.push("/signin");
  };

  return (
    <motion.div
      initial={{ left: "-30rem", boxShadow: "0 0 0" }}
      animate={{
        left: isOpen ? 0 : "-30rem",
        boxShadow: isOpen ? "0 0 30px #ddddddaa" : "0 0 0",
      }}
      transition={{ duration: 0.4 }}
      className="fixed h-full w-64 bg-black text-white p-4 top-0 right-0 z-10 font-bold"
      // style={{ boxShadow: "0 0 30px #ddddddaa " }}
    >
      <nav className="vertical-nav">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="logo-container flex flex-row justify-between"
        >
          <h1 className="logo">
            <Logo />
          </h1>
          <AnimatedButton onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="12"
              viewBox="0 0 384 512"
            >
              <path
                opacity="1"
                fill="#1E3050"
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </AnimatedButton>
        </motion.div>
        <ul className="nav-links mt-4 ">
          {data.map(({ name, to, click, ref }, index) => {
            return (
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={index}
                className=" border-b-2 py-4 px-4"
                onClick={click}
              >
                <p onClick={click}>{name}</p>
              </motion.li>
            );
          })}
        </ul>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="auth-buttons"
        ></motion.div>
      </nav>
      <CustomModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        data={userData}
        closeSidebar={onClose}
      />
      {/* Add your sidebar content here */}
    </motion.div>
  );
};

export default Sidebar;
