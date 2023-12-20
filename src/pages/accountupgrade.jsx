import CopyrightFooter from "@/components/Copyright";
import HeaderDash from "@/components/HeaderDash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarHome from "@/components/SidebarHome";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AccountTypeInfo = [
  {
    name: "Beginner a/c",
    motto: "New Into Trading ....",
    InitialDeposit: 100,
    Leverage: "Up to 1:100",
    Profits: "25%",
  },
  {
    name: "Standard a/c",
    motto: "Already Into Trading ....",
    InitialDeposit: 500,
    Leverage: "Up to 1:500",
    Profits: "50%",
  },
  {
    name: "Master a/c",
    motto: "Expert In Trading ....",
    InitialDeposit: 1000,
    Leverage: "Up to 1:1000",
    Profits: "75%",
  },
];

const AccountUpgrade = () => {
  const router = useRouter();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const upgradeAccount = (name, InitialDeposit) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let userData
        const userRef = doc(firestore, "users", user.uid);
        await getDoc(userRef).then( (x) => userData = x.data());
        console.log("data", userData);
        if (userData.accountBalance >= InitialDeposit) {
          console.log("enough money");
          await updateDoc(userRef, { accountLevel: name }).then(() =>
            router.push("/home")
          );
        } else {
          alert("Not enough account balance to upgrade account");
        }
      } else {
      }
    });
    // router.push("/signup")
  };
  // useEffect(() =>{
  //   try {
  //     onAuthStateChanged((auth))
  //

  // })

  return (
    <>
      <HeaderDash onOpen={handleOpenSidebar} />

      <SidebarHome isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <section className=" bg-[#f5f8f7] py-8">
        <p className=" text-center text-xl font-bold text-gray-400">
          {" "}
          Account Types{" "}
        </p>
        <h2 className=" text-center text-5xl text-gray-800 font-bold my-4">
          Solarfx Trading <span className="text-green-500">Accounts</span>
        </h2>
        <div className=" grid grid-cols-1 gap-5 place-items-center md:grid-cols-3">
          {AccountTypeInfo.map(
            ({ InitialDeposit, Leverage, Profits, name, motto }, index) => {
              return (
                <ul
                  key={index}
                  className="rounded-md py-1 w-11/12 m-auto mt-8 border-solid border border-gray-300 shadow-[ 0 0 10px 5px black]"
                  style={{ boxShadow: "inset 0 0 30px #ddddddaa " }}
                >
                  <li className="text-center py-8 ">
                    <h3 className="font-bold font-sans text-2xl text-gray-800">
                      {" "}
                      {name}{" "}
                    </h3>
                    <p className="font-bold font-sans text-xl text-gray-500">
                      {" "}
                      {motto}{" "}
                    </p>
                    <p className=" text-7xl font-bold py-10">
                      ${InitialDeposit}
                    </p>
                  </li>
                  <li className="bg-gray-200 text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                    <span>Initial Deposit</span>{" "}
                    <span className="text-right">{InitialDeposit}</span>
                  </li>
                  <li className=" text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                    <span>Profit</span>{" "}
                    <span className="text-right ">{Profits}</span>
                  </li>
                  <li className="bg-gray-200 text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                    <span>Leverage</span>{" "}
                    <span className="text-right">{Leverage}</span>
                  </li>
                  {/* <Link href="/signup"> Open</Link> */}
                  <button
                    className=" py-3 px-10 my-2 block mx-auto bg-gray-500 text-gray-100 rounded-lg font-bold text-xl wor shadow-inner"
                    onClick={() => upgradeAccount(name, InitialDeposit)}
                  >
                    Register
                  </button>
                </ul>
              );
            }
          )}
        </div>
      </section>
      <CopyrightFooter />
    </>
  );
};

export default AccountUpgrade;
