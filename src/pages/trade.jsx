import CopyrightFooter from "@/components/Copyright";
import HeaderDash from "@/components/HeaderDash";
import Sidebar from "@/components/SidebarHome";
import Ticker from "@/components/ticker";
import { useState, useEffect, createRef, useMemo} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore, auth } from "@/components/Firebase";
import { data } from "autoprefixer";
import { useRouter } from "next/router";




export default function Trade() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserAuthInfo = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("ther is a user", uid);
            const userRef = doc(firestore, "users", user.uid);
            try {
              await getDoc(userRef).then((file) => {
                setUserData(file.data());
              });
            } catch (err) {
              console.log(err);
            }
            // finally {
            //   if (userData != null && userData.email == "admin@gmail.com") {
            //     console.log("admin is in control")
            //     router.push("/secret");
            //   }
            // }
            // ...b
            console.log("done");
            // console.log("this is user Data", userData)
          } else {
            // User is signed out
            // ...
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserAuthInfo();
  }, []);

  const upgrading = async (tradingAmount, balance) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let accBal = balance - tradingAmount;
        const userRef = doc(firestore, "users", user.uid);

        await updateDoc(userRef, {
          pendingtradingAmount: tradingAmount,
          accountBalance: accBal,
        });
      } else {
        console.log("no user logged in");
      }
    });
    // router.push("/signup")
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const [accountBalance, setAccountBalance] = useState(1000); // Replace with your actual account balance
  const [tradeAmount, setTradeAmount] = useState(0);

  const handleTrade = () => {
    // Perform your trade logic using accountBalance and tradeAmount
  if(tradeAmount > userData.accountBalance){
    alert("Insufficient Balance \nPlease deposit more funds")
    return
  }

    upgrading(tradeAmount, userData.accountBalance).then(() => {
      const newAccountBalance = userData.accountBalance - tradeAmount;
      console.log(
        `Trade Executed: Account Balance after trade:  $${newAccountBalance}`
      );
  
      alert(
        `Trade Executed: Account Balance after trade: $${newAccountBalance}`
      );
        router.push("/home")
    });
    
    // window.location.reload()

    // You can further update state, send API requests, or perform any necessary actions here
  };

  return (
    <>
      <HeaderDash onOpen={handleOpenSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      {/* <Ticker /> */}
      <main className="w-[95vw] mx-auto my-12 border p-3 rounded-lg">
        <h1 className="font-bold text-4xl text-gray-700">Trade</h1>
        <div>
          <form className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
            {userData && (
              <div className="mb-4">
                <label
                  htmlFor="accountBalance"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Account Balance:
                </label>
                <input
                  type="text"
                  id="accountBalance"
                  name="accountBalance"
                  value={`$${userData.accountBalance}`}
                  readOnly
                  className="w-full p-2 bg-gray-100 border rounded-md"
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="tradeAmount"
                className="block text-gray-700 font-bold mb-2"
              >
                Trade Amount:
              </label>
              <input
                type="number"
                id="tradeAmount"
                name="tradeAmount"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(Number(e.target.value))}
                className="w-full p-2 bg-gray-100 border rounded-md"
              />
            </div>
            <button
              type="button"
              onClick={handleTrade}
              className="w-full bg-green-500 text-gray-100 p-3 font-bold rounded-md hover:bg-green-700"
            >
              Trade
            </button>
          </form>
        </div>
      </main>
      <CopyrightFooter />
    </>
  );
}
