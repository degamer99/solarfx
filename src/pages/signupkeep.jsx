import { motion } from 'framer-motion';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../components/Firebase';


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simplified form validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Perform signup logic (not implemented in this example)
    setError(''); // Clear any previous error
    console.log('Form submitted:', formData);
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in');
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900from-gray-700 to-gray-900"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign Up for Your Account</h2>

        {/* Form for user registration */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 mb-4 text-sm">
              <strong>Error:</strong> {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700 focus:outline-none"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUpPage;

// import { motion } from "framer-motion";

// const SignUpPage = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
//     >
//       <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">
//           Sign Up for Your Account
//         </h2>

//         {/* Form for user registration */}
//         <form>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-600">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               className="w-full border border-gray-300 p-2 rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full border border-gray-300 p-2 rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full border border-gray-300 p-2 rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-8">
//             <label htmlFor="confirmPassword" className="block text-gray-600">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               className="w-full border border-gray-300 p-2 rounded-md"
//               required
//             />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700 focus:outline-none"
//           >
//             Sign Up
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default SignUpPage;
