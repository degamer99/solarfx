// pages/deposit.js
import { motion } from "framer-motion";

const paymentMethods = [
  {
    name: "Visa",
    icon: "/icons/visa.png",
  },
  {
    name: "MasterCard",
    icon: "/icons/mastercard.png",
  },
  // Add more payment methods as needed
];

const DepositPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6">Deposit Funds</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={index}
              className="p-4 bg-gray-200 rounded-md flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <img src={method.icon} alt={method.name} className="w-12 h-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
