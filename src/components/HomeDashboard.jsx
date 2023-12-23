import { motion } from "framer-motion";
import AnimatedButton from "./AnimBtn";
import { useRouter } from "next/router";
import ProgressBar from "./progressBar";
import { useState, useEffect } from "react";
import { connectFirestoreEmulator } from "firebase/firestore";

const HomeDashboard = ({ data, update }) => {
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
  const [percentage, setPercentage] = useState();
  const calculateDaysDifference = (endDate) => {
    const today = new Date();

// Create a new date object for tomorrow
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

    const currentDate = new Date();
    // const currentDate = tomorrow;
    const endDateObject = new Date(endDate.seconds * 1000);
    const timeDifference = currentDate - endDateObject;

    const totalMinutesInDay = 24 * 60; // Total minutes in a day

    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    const percentageOfDay = (
      ((minutesDifference / totalMinutesInDay) * 100) %
      100
    ).toFixed(2);

    const normalizedPercentage = Math.min(100, Math.max(0, percentageOfDay));
    // setPercentage(percentageOfDay);

    console.log({
      currentDate,
      endDateObject,
      endDate: endDate.seconds,
      timeDifference,
      minutesDifference,
      percentageOfDay,
      percentage,
    });
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const currentProfit = daysDifference 
    return { daysDifference, percentageOfDay, normalizedPercentage };
  };

  

  // useEffect(() => {
  //   // Call calculateDaysDifference only when the component mounts
  //   if (data != null) {
  //     console.log(" what is the data", data)
  //     const { percentageOfDay } = calculateDaysDifference(
  //       data.date /* provide endDate here */
  //     );
  //     console.log("Percentage of the day", percentageOfDay)

  //   }
  // }, []);

  // let name = data.firstName + " " + data.
  const [todayProfit, setTodayProfit] = useState(0)
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
            <p className="text-2xl font-semibold text-gray-500">
              {data != null ? `$${data.accountBalance}` : "_"}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Pending Profits</h3>
            <p className="text-2xl font-semibold text-gray-500">
              {/* {data != null ? `$${data.totalProfit}` : "_"} */}
              {/* {data != null
                ? () => {
                    return "hello";
                  }
                : "_"} */}

              {data !== null
                ? (() => {
                    const accountLevel = data.accountLevel.toLowerCase();
                    let conditionText = 0;
                    console.log("the date ", data.date);

                    switch (accountLevel) {
                      case "beginner a/c":
                        conditionText = calculateDaysDifference(data.date).daysDifference * 0.25 * data.accountBalance;
                        if (data.accountBalance >= 500){
                          alert("Account Balance Exceeds Account Size \nPlease Upgrade to a Bigger Account i.e Standard a/c or Master a/c")
                          console.log("more than beginner");
                          router.push("/accountupgrade")
                          // take him to upgrade and upgrade
                        }else{
                          update(conditionText)
                          return conditionText;
                        }
                        break;
                        case "standard a/c":
                          // conditionText = `Days since becoming a standard user: ${calculateDaysDifference(
                            //   data.date
                            // )} days`;
                            conditionText = calculateDaysDifference(data.date).daysDifference * 0.5 * data.accountBalance;
                            if (data.accountBalance >= 1000){
                          alert("Account Balance Exceeds Account Size \nPlease Upgrade to a Bigger Account i.e Standard a/c or Master a/c")
                          //alert("Account Balance Exceeds Account Size \nPlease Upgrade to a Bigger Account")
                              console.log("more than standard");
                              router.push("/accountupgrade")
                        }else{
                          update(conditionText)
                          return conditionText;
                        }
                        break;
                      case "master a/c":
                        conditionText = calculateDaysDifference(data.date).daysDifference * 0.75 * data.accountBalance;
                        update(conditionText)
                        console.log("inside master")
                       return conditionText;
                        break;
                      default:
                        conditionText = 0;
                    }
                    // setTodayProfit(conditionText)
                    console.log("outside all")
                     
                  })()
                : "_"}
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2"
        >
          <div className="bg-white p-2 mt-3 rounded-md shadow-md">
            <h3 className="text-lg font-semibold">Daily Progress</h3>
            <div className="text-2xl">
            {data && (() => {
                    console.log("daily true")
                    const {percentageOfDay, normalizedPercentage} = calculateDaysDifference(data.date)
                    console.log(percentageOfDay, normalizedPercentage)
                  return <ProgressBar normalizedPercentage={normalizedPercentage} data={data} func={calculateDaysDifference} />
                })()
                // 
                // :
                // <ProgressBar percentage={undefined} />
              } 
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">Account Level</h3>
            <p className="text-2xl font-semibold text-gray-500">
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
