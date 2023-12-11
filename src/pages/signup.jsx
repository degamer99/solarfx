import { useState } from "react";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { auth, firestore } from "../components/Firebase";
import AnimatedButton from "@/components/AnimBtn";
import PasswordToggle from "@/components/PasswordToggle";
import { Router, useRouter } from "next/router";
import HeadNavData from "@/data/HeadNavData";
import Header from "@/components/Header";
import Link from "next/link";


const InputField = ({ label, onChange, value }) => {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <label className="block text-sm text-gray-600">{label}</label>
      {label.search("Password") != -1 ? (
        <PasswordToggle
          label={value}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition duration-300"
        />
      ) : (
        <motion.input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-500 transition duration-300"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        />
      )}
    </motion.div>
  );
};

const SignUpPage = () => {
  const [step, setStep] = useState(0);

  // Separate state values for each input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const formInfo = [
    {
      PersonalInfo: [
        { name: "First Name", value: firstName, set: setFirstName },
        { name: "Last Name", value: lastName, set: setLastName },
        // "First Name",
        // "Last Name",
      ],
    },
    {
      ContactInfo: [
        { name: "Email Address", value: email, set: setEmail },
        { name: "Phone Number", value: phoneNumber, set: setPhoneNumber },

        // "Email Address",
        // "Phone Number",
      ],
    },
    {
      FinancialInfo: [
        { name: "Password", value: password, set: setPassword },
        {
          name: "Confirm Password",
          value: confirmPassword,
          set: setConfirmPassword,
        },
        // "Password",
        // "Confirm Password",
      ],
    },
  ];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const isLastStep = step === formInfo.length - 1;

  const handleSignUp = async (data) => {
    try {
      setErrorMessage("Loading ...");
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Store extra data in Firestore
      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, data).then(() => router.push("/home"));

      console.log("User signed up:", user);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error signing up:", error.message);
    }
  };

  const handleFormSubmit = () => {
    const formData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };
    handleSignUp(formData);
    // Add your logic to handle form submission (e.g., Firebase authentication)
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          className="w-4/5 max-w-xl mx-auto p-6 bg-white rounded-md shadow-md"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Step {step + 1}</h2>
          {formInfo[step][Object.keys(formInfo[step])[0]].map(
            (field, index) => {
              return (
                <InputField
                  key={index}
                  label={field.name}
                  value={field.value}
                  onChange={(value) => field.set(value)}
                />
              );
            }
          )}
          <div className="flex justify-between mt-3 items-center font-bold">
            {step > 0 && <p onClick={handlePrevStep}> Previous</p>}
            {!isLastStep && (
              <AnimatedButton label="Next" onClick={handleNextStep} />
            )}
            {isLastStep && (
              <AnimatedButton label="Submit" onClick={handleFormSubmit} />
            )}
            
          </div>
          <p className="text-gray-600 font-bold text-center my-4">
            Already have an Account:{" "}
            <Link href={"/signin"} className="text-blue-500 underline">
              {" "}
              Sign in
            </Link>
          </p>
          {<div className="text-red-500 mt-2">{errorMessage}</div>}
        </motion.div>
      </div>
    </>
  );
};

export default SignUpPage;
