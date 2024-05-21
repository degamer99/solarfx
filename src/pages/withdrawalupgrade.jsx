import CopyrightFooter from "@/components/Copyright";
import HeaderDash from "@/components/HeaderDash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SidebarHome from "@/components/SidebarHome";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "@/components/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Solana from "../../public/images/solana.svg";
import usdt from "../../public/images/tether-1.svg";
import Bitcoin from "../../public/images/bitcoin.svg";
import Paypal from "../../public/images/paypal-3.svg";
import MoneyTransactionDialog from "@/components/MoneyTransactionDialog";

const AccountTypeInfo = [
    {
        name: "Beginner Limit.",
        motto: "New Into Trading ....",
        InitialDeposit: 500,
        Leverage: "Up to 1:100",
        Profits: "250%",
        Cost: "0%",
        upgrade: ""
    },
    {
        name: "Standard Limit.",
        motto: "Already Into Trading ....",
        InitialDeposit: 5000,
        Leverage: "Up to 1:500",
        Profits: "500%",
        Cost: "4%",
        upgrade: "upgrade"
    },
    // {
    //     name: "Master Limit.",
    //     motto: "Expert In Trading ....",
    //     InitialDeposit: "Unlimited",
    //     Leverage: "Up to 1:1000",
    //     Profits: "750%",
    //     Cost: "4%",
    //     upgrade: "upgrade"
    // },
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
                let userData;
                const userRef = doc(firestore, "users", user.uid);
                await getDoc(userRef).then((x) => (userData = x.data()));
                console.log("data", userData);
                if (userData.accountBalance >= InitialDeposit) {
                    console.log("enough money");
                    const newBalance = userData.accountBalance - InitialDeposit;
                    const todaysDate = new Date();
                    await updateDoc(userRef, {
                        accountLevel: name,
                        accountBalance: newBalance,
                        date: todaysDate,
                    }).then(() => router.push("/home"));
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
    const [dialogData, setDialogData] = useState({
        system: "Upgrade by Bitcoin",
        limit: "No limit",
        Withdrawal: false,
        address: "1CHuyY3Eju1NmRy9b6TAStd8nFnUxyWBSt",
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [amount, setAmount] = useState(0)

    const handleOpenDialog = (cost) => {
        setDialogData({
            system: "Upgrade by Bitcoin",
            limit: "No limit",
            Withdrawal: false,
            address: "1CHuyY3Eju1NmRy9b6TAStd8nFnUxyWBSt",
            amount: cost,
        })

        setAmount(cost)
        console.log(dialogData)
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        console.log("done");
        setIsDialogOpen(false);
    };

    const handleConfirmTransaction = (transactionData) => {
        // Handle the confirmed transaction data (e.g., send to the server)
        console.log("Confirmed Transaction:", transactionData);
    };

   

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
                    Solarfx <span className="text-green-500">Withdrawal Limits</span>
                </h2>
                <div className=" grid grid-cols-1 gap-5 place-items-center md:grid-cols-3">
                    {AccountTypeInfo.map(
                        ({ InitialDeposit, Leverage, Profits, name, motto, Cost, upgrade }, index) => {
                            return (
                                <ul
                                    key={index}
                                    className="rounded-md py-2 w-9/12 m-auto mt-8 border-solid border border-gray-300 shadow-[ 0 0 10px 5px black]"
                                    style={{ boxShadow: "inset 0 0 30px #ddddddaa " }}
                                >
                                    <li className="text-center pt-4 ">
                                        <h3 className="font-bold font-sans text-2xl text-gray-600">
                                            {" "}
                                            {name}{" "}
                                        </h3>
                                        <p className=" text-7xl font-bold py-6">
                                            {Cost}
                                        </p>
                                    </li>
                                    <li className="bg-gray-200 text-gray-500 flex justify-between text-xl px-6 py-4 my-8 font-bold">
                                        <span>Limit</span>{" "}
                                        <span className="text-right">${InitialDeposit}</span>
                                    </li>
                                  
                                    {/* <Link href="/signup"> Open</Link> */}
                                    {upgrade == "upgrade" ?  <button
                                        className=" py-3 px-10 my-2 block mx-auto bg-gray-500 text-gray-100 rounded-lg font-bold text-xl wor shadow-inner"
                                        onClick={() => handleOpenDialog(InitialDeposit)}
                                    >
                                        Upgrade
                                    </button> : <button> </button>}
                                   
                                </ul>
                            );
                        }
                    )}
                </div>
            </section>
            <MoneyTransactionDialog
                head={dialogData.system}
                address={dialogData.address}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirmTransaction}
                information={dialogData.information}
                Withdrawal={dialogData.Withdrawal}
                amount={amount}
                setAmount={setAmount}
                upgrade={true}
            />
            <CopyrightFooter />
        </>
    );
};

export default AccountUpgrade;
