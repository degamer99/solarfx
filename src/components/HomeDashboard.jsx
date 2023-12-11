import { motion } from 'framer-motion';

const HomeDashboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="m-8 p-8 rounded-md border-2"

    >
      <h2 className="text-4xl font-semibold mb-4"> Dashboard</h2>

      <motion.div variants={itemVariants} className="flex flex-wrap -mx-4">
        {/* Sample widgets - Replace with actual data */}
        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Account Balance</h3>
            <p className="text-2xl">$0</p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Profits</h3>
            <p className="text-2xl">$0</p>
          </div>
        </motion.div>
{/* 
        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Market News</h3>
            <p className="text-2xl">Latest updates</p>
          </div>
        </motion.div> */}

      </motion.div>
    </motion.div>
  );
};

export default HomeDashboard;
