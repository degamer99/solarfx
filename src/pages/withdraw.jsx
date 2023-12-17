import HeaderDash from "@/components/HeaderDash";
import PaymentCard from "@/components/PaymentCard";
import Sidebar from "@/components/SidebarHome";
import Solana from "../../public/images/solana.svg";
import Litecoin from "../../public/images/litecoin.svg";
import Bitcoin from "../../public/images/bitcoin.svg";
import Paypal from "../../public/images/paypal-3.svg";
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
          logoSrc={Bitcoin.src} // Replace with the actual path to Bitcoin logo
          system="Bitcoin"
          limit="No limit"
          processingTime="Varies"
          onClick={handleOpenDialog}
          fee="Transaction fees may apply"
        >
          <MoneyTransactionDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmTransaction}
          />
        </PaymentCard>
        <PaymentCard
          logoSrc={Solana.src} // Replace with the actual path to Bitcoin logo
          system="Solana"
          limit="No limit"
          processingTime="Varies"
          onClick={handleOpenDialog}
          fee="Transaction fees may apply"
        />
        <PaymentCard
          logoSrc={Litecoin.src} // Replace with the actual path to Bitcoin logo
          system="Litecoin"
          limit="No limit"
          processingTime="Varies"
          onClick={handleOpenDialog}
          fee="Transaction fees may apply"
        />
        <PaymentCard
          logoSrc={Paypal.src} // Replace with the actual path to Bitcoin logo
          // system="Paypal"
          limit="No limit"
          processingTime="Varies"
          // onClick={handleOpenDialog}
          fee="Transaction fees may apply"
          cstyle={"opacity-20"}
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
