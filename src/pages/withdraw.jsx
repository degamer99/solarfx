import HeaderDash from "@/components/HeaderDash";
import PaymentCard from "@/components/PaymentCard";
import Sidebar from "@/components/SidebarHome";
import Solana from "../../public/images/solana.svg";
import Litecoin from "../../public/images/litecoin.svg";
import Bitcoin from "../../public/images/bitcoin.svg";
import usdt from "../../public/images/tether-1.svg";
import Paypal from "../../public/images/paypal-3.svg";
import LocalBank from "../../public/images/localBank.png";
import SidebarHome from "@/components/SidebarHome";
import { useState } from "react";
import CopyrightFooter from "@/components/Copyright";
import MoneyTransactionDialog from "@/components/MoneyTransactionDialog";

export default function Withdrawal() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
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

      <main className="w-[95vw] mx-auto my-2 border p-3 rounded-lg ">
        <h1 className="font-bold text-4xl text-gray-700">Withdraw</h1>
        {/* <PaymentCard
          time="20 days"
          fee="$200"
          limit="1 - 10,000 USD"
          src={Neteller}
        />
        <PaymentCard
          time="20 days"
          fee="$200"
          limit="1 - 10,000 USD"
          src={Bitcoin}
        />
        <PaymentCard
          time="20 days"
          fee="$200"
          limit="1 - 10,000 USD"
          src={Neteller}
        /> */}
         <PaymentCard
          logoSrc={LocalBank.src} // Replace with the actual path to Bitcoin logo
          system="Local Bank"
          limit="No limit"
          Withdrawal={true}

          // information=["Account Name","Account Number",]
          processingTime="Varies"
          // onClick={handleOpenDialog}
          fee="Transaction fees may apply"
          cstyle={"opacity-20"}
        />
        <PaymentCard
          logoSrc={Bitcoin.src} // Replace with the actual path to Bitcoin logo
          system="Bitcoin"
          limit="No limit"
          Withdrawal={true}
          processingTime="Varies"
          onClick={handleOpenDialog}
          address="1CHuyY3Eju1NmRy9b6TAStd8nFnUxyWBSt"
          fee="Transaction fees may apply"
        >
          {/* <MoneyTransactionDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmTransaction}
          /> */}
        </PaymentCard>
        <PaymentCard
          logoSrc={Solana.src} // Replace with the actual path to Bitcoin logo
          system="Solana"
          limit="No limit"
          Withdrawal={true}
          // information={["Account Name","Account Number",]}
          processingTime="Varies"
          onClick={handleOpenDialog}
          address="2B9EwQ41kc98uR5pyTvTZSffbbL9Wp9recfrTRraBbnT"
          fee="Transaction fees may apply "
        />
        <PaymentCard
          logoSrc={usdt.src} // Replace with the actual path to Bitcoin logo
          system="USDT"
          limit="No limit"
          Withdrawal={true}
          // information={["Account Name","Account Number",]}
          processingTime="Varies"
          onClick={handleOpenDialog}
          address="0x36a4b8b6f96e140dd2fa3f0e80e658f487d459fc"
          fee="Transaction fees may apply"
        />
       

        <div className=" items-center justify-center min-h-screen bg-gray-100 hidden">
          <button
            onClick={handleOpenDialog}
            className="bg-green-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-green-600 focus:outline-none"
          >
            Open Transaction Dialog
          </button>
          <MoneyTransactionDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmTransaction}
          />
        </div>
      </main>
      <CopyrightFooter />
    </>
  );
}
