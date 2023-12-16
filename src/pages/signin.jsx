import { useRouter } from "next/router";
// import { useState } from 'react';
import { auth, firestore } from "../components/Firebase";
import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import PasswordToggle from "@/components/PasswordToggle";
import AnimatedButton from "@/components/AnimBtn";
import Link from "next/link";
import CopyrightFooter from "@/components/Copyright";

const handleSignUp = async () => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Store extra data in Firestore
    const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, {
      email,
      // Add more fields as needed
    });

    console.log("User signed up:", user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

const SignInPage = () => {
  const Info = [
    {
      PersonalInfo: [
        "Full name",
        "Date of Birth",
        "Gender",
        "Nationality",
        "Social Security Number",
      ],
    },
    {
      ContactInfo: [
        "Email Address",
        "Phone Number",
        "Residential Address",
        "Mailing Address",
      ],
    },
    {
      FinancialInfo: [
        "Employment Status",
        "Annual Income",
        "Net Worth",
        "Source of Funds",
      ],
    },
  ];

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    try {
      setErrorMessage("Loading ...");

      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User signed in");
      router.push("/");
    } catch (error) {
      handleAuthError(error);

      console.error("Error signing in:", error.message);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setErrorMessage(
          "Email is already in use. Please choose another email."
        );
        break;
      case "auth/invalid-email":
        setErrorMessage("Invalid email address.");
        break;
      case "auth/weak-password":
        setErrorMessage(
          "Password is too weak. Please choose a stronger password."
        );
        break;
      case "auth/invalid-credential":
      case "auth/user-not-found":
      case "auth/wrong-password":
        setErrorMessage("Invalid email or password.");
        break;
      default:
        setErrorMessage(
          "An error occurred during authentication. Please try again later."
        );
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simplified form validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Perform login logic (not implemented in this example)
    setError(""); // Clear any previous error
    console.log("Form submitted:", formData);
    // submit data to firebase
    handleSignIn();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      style={{boxShadow: "0 0 20px #ddddddaa"}}
      // className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 "
    >
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md"
      style={{boxShadow: "0 0 20px #ddddddaa"}}
      >
          <h2 className="text-3xl text-center text-gray-800 font-bold mb-4">Sign In to <span className="text-green-500">Quantum Exchange</span></h2>
        {/* <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign In</h2> */}

        {/* Form for user login */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold text-gray-600">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-500"
              placeholder="Enter your Email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block font-bold text-gray-600">
              Password
            </label>
            <PasswordToggle
              value={formData.password}
              id="password"
              name="password"
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-500"
              // placeholder="Enter your password"
              required
            />
          </div>
          {<div className="text-black font-bold my-2 ">{errorMessage}</div>}

          {error && (
            <p className="text-black font-bold mb-4 text-sm">
              <strong>Error:</strong> {error}
            </p>
          )}
          <AnimatedButton label="Sign In" cstyle="text-white" />
          <p className="text-gray-600 font-bold text-center my-4">
            Create a new Account:{" "}
            <Link href={"/signup"} className="text-blue-500 underline">
              {" "}
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <CopyrightFooter />
    </motion.div>
  );
};

export default SignInPage;

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// // InputField.js
// const InputField = ({ label, type, value, onChange }) => {
//   return (
//     <motion.div
//       className="mb-4"
//       initial={{ opacity: 0, x: 20 }}
//       animate={{ opacity: 1, x: 0 }}
//       exit={{ opacity: 0, x: -20 }}
//       transition={{ duration: 0.5 }}
//     >
//       <label className="block text-sm text-gray-600">{label}</label>
//       <motion.input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition duration-300"
//         whileHover={{ scale: 1.02 }}
//         whileFocus={{ scale: 1.02 }}
//       />
//     </motion.div>
//   );
// };

// // SignUpForm.js
// const SignUpForm = ({ info, onChange }) => {
//   return (
//     <motion.div
//       className="mb-6"
//       initial={{ opacity: 0, height: 0 }}
//       animate={{ opacity: 1, height: 'auto' }}
//       exit={{ opacity: 0, height: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {info.map((field, index) => (
//         <InputField
//           key={index}
//           label={field}
//           type="text"
//           onChange={(e) => onChange(field, e.target.value)}
//         />
//       ))}
//     </motion.div>
//   );
// };

// // SignUpPage.js
// const Info = [
//   {
//     PersonalInfo: [
//       'Full name',
//       'Date of Birth',
//       'Gender',
//       'Nationality',
//       'Social Security Number',
//     ],
//   },
//   {
//     ContactInfo: ['Email Address', 'Phone Number', 'Residential Address', 'Mailing Address'],
//   },
//   {
//     FinancialInfo: ['Employment Status', 'Annual Income', 'Net Worth', 'Source of Funds'],
//   },
// ];

// const SignUpPage = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState({});

//   const handleNext = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handlePrev = () => {
//     setCurrentStep((prevStep) => prevStep - 1);
//   };

//   const handleFormChange = (field, value) => {
//     setFormData((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const isLastStep = currentStep === Info.length - 1;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <motion.div
//         className="bg-white p-8 rounded-md shadow-md max-w-md mx-auto"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
//         <SignUpForm
//           info={Info[currentStep][Object.keys(Info[currentStep])[0]]}
//           onChange={(field, value) => handleFormChange(field, value)}
//         />

//         <motion.div
//           className="flex justify-between mt-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           {currentStep > 0 && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handlePrev}
//               className="text-gray-600 font-medium focus:outline-none"
//             >
//               Previous
//             </motion.button>
//           )}

//           {!isLastStep && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleNext}
//               className="bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 focus:outline-none"
//             >
//               Next
//             </motion.button>
//           )}

//           {isLastStep && (
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => console.log('Submit Data:', formData)}
//               className="bg-green-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-green-600 focus:outline-none"
//             >
//               Submit
//             </motion.button>
//           )}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUpPage;

// import { motion } from 'framer-motion';

// const SignUpPage = () => {
//   const Info = [
//     {
//       PersonalInfo: [
//         "Full name",
//         "Date of Birth",
//         "Gender",
//         "Nationality",
//         "Social Security Number",
//       ],
//     },
//     {
//       ContactInfo: [
//         "Email Address",
//         "Phone Number",
//         "Residential Address",
//         "Mailing Address",
//       ],
//     },
//     {
//       FinancialInfo: [
//         "Employment Status",
//         "Annual Income",
//         "Net Worth",
//         "Source of Funds",
//       ],
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="p-8 bg-green-500 text-white"
//     >
//       <h2 className="text-4xl font-semibold mb-6">Create Your Account</h2>

//       <form>
//         {Info.map((section, index) => (
//           <motion.div key={index} variants={itemVariants} className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">{Object.keys(section)[0]}</h3>
//             {section[Object.keys(section)].map((field, fieldIndex) => (
//               <div key={fieldIndex} className="mb-4">
//                 <label htmlFor={field} className="block text-gray-300">{field}</label>
//                 <input
//                   type="text"
//                   id={field}
//                   name={field}
//                   className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-500"
//                   required
//                 />
//               </div>
//             ))}
//           </motion.div>
//         ))}

//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="bg-white text-green-500 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 focus:outline-none"
//         >
//           Sign Up
//         </motion.button>
//       </form>
//     </motion.div>
//   );
// };

// export default SignUpPage;
