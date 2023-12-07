import { motion } from 'framer-motion';
import { useState } from 'react';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    // Perform login logic (not implemented in this example)
    setError(''); // Clear any previous error
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 text-white"
    >
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Sign In to Your Account</h2>

        {/* Form for user login */}
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
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-500"
              placeholder="Enter your password"
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
            className="bg-green-500 text-white py-3 px-4 rounded-full font-semibold hover:bg-green-700 focus:outline-none"
          >
            Sign In
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SignInPage;
