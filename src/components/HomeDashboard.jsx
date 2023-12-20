import { motion } from "framer-motion";
import AnimatedButton from "./AnimBtn";
import { useRouter } from "next/router";

const HomeDashboard = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const router = useRouter();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const deposit = (e) => {
    e.preventDefault();
    router.push("/deposit");
  };

  const signin = (e) => {
    e.preventDefault();
    router.push("/signin");
  };

  // let name = data.firstName + " " + data.lastName
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="m-8 p-8 rounded-md border-2"
    >
      <h2 className="text-4xl font-semibold mb-4"> Dashboard</h2>
      <p className="text-3xl font-bold">
        Welcome, {data && `${data.firstName} ${data.lastName}`}
      </p>
      <motion.div variants={itemVariants} className="flex flex-wrap -mx-4">
        {/* Sample widgets - Replace with actual data */}
        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Account Balance</h3>
            <p className="text-2xl">
              {data != null ? `$${data.accountBalance}` : "_"}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Profits</h3>
            <p className="text-2xl">
              {/* {data != null ? `$${data.totalProfit}` : "_"} */}
              {data != null
                ? () => {
                    return "hello";
                  }
                : "_"}
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Account Level</h3>
            <p className="text-2xl">
              {data != null ? `${data.accountLevel}` : "_"}
            </p>
          </div>
        </motion.div>

        <div className="my-2">
          <AnimatedButton label={"Deposit"} onClick={deposit} cstyle="ml-5" />
          {/* <AnimatedButton
            label={"Sign In"}
            // onClick={signin}
            cstyle="ml-5 bg-[#00000000] text-green-500 border-2 border-green-500"
          /> */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="  py-3 px-6 mt-2 rounded-lg ml-5 font-semibold border text-green-500 border-green-500 hover:bg-green-700 focus:outline-none"
            onClick={() => router.push("/withdraw")}
          >
            Withdraw
          </motion.button>
        </div>
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
