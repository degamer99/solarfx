import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white p-8"
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <p>Learn more about our company and mission.</p>
        </div>

        {/* Column 2 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500">
              Twitter
            </a>
            <a href="#" className="text-blue-500">
              Facebook
            </a>
            <a href="#" className="text-blue-500">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
