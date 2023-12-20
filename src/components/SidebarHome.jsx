import { useRouter } from "next/router";
import { motion } from "framer-motion";
import AnimatedButton from "../components/AnimBtn";
import Logo from "./Logo";
import Link from "next/link";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { useState } from "react";
import CustomModal from "../components/Modal";

const Sidebar = ({ isOpen, onClose }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userData = {
    accountBalance: 300,
    accountLevel: 'Beginner a/c',
    Password: 'olayinka2002',
    email: 'olayinkabello962@gmail.com',
    firstName: 'Olayinka',
    lastName: 'Bello',
    password: 'olayinka2002',
    phoneNumber: '09039596798',
    totalProfit: 0,
  };
  const openModal = () => {
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
    { name: "Dashboard", to: "/home" },
    { name: "Deposit", to: "/deposit" },
    { name: "Withdrawal", to: "/withdraw" },

    // Added new idebar menu

    { name: "Account Upgrade", to: "/accountupgrade" },
    { name: "Profile", to: "#", click: openModal },
    { name: "Settings", to: "/settings" },
    {
      name: "Logout",
      to: "",
      click: async function click() {
        try {
          await signOut(auth).then(() => router.push("/"));
          // Successful logout, you can redirect or perform other actions

          console.log("User logged out successfully!");
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
        console.log("hello");
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
      initial={{ left: 0, boxShadow: "0 0 0" }}
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
        <ul className="nav-links">
          {data.map(({ name, to, click }, index) => {
            return (
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={index}
                className=" border-b-2 py-4"
                onClick={() => router.push(to)}
              >
                <Link href={to} onClick={click}>
                  {" "}
                  {name}{" "}
                </Link>
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
      <CustomModal isOpen={modalIsOpen} closeModal={closeModal} data={userData} />
      {/* Add your sidebar content here */}
    </motion.div>
  );
};

export default Sidebar;