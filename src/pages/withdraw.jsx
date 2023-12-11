import HeaderDash from "@/components/HeaderDash";
import PaymentCard from "@/components/PaymentCard";
import Sidebar from "@/components/SidebarHome";
import Neteller from "../../public/images/neteller-1.svg";
import Bitcoin from "../../public/images/binance-logo.svg";
import SidebarHome from "@/components/SidebarHome";
import { useState } from "react";

export default function Withdrawal() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <HeaderDash onOpen={handleOpenSidebar} />
      <SidebarHome isOpen={isSidebarOpen} onClose={handleCloseSidebar} />

      <main className="w-[95vw] mx-auto my-2 border p-3 rounded-lg opacity-25">
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
          logoSrc={Neteller.src} // Replace with the actual path to Bitcoin logo
          // system="Neteller"
          limit="No limit"
          processingTime="Varies"
          fee="Transaction fees may apply"
        />
        <PaymentCard
          logoSrc={Bitcoin.src} // Replace with the actual path to Bitcoin logo
          system="Bitcoin"
          limit="No limit"
          processingTime="Varies"
          fee="Transaction fees may apply"
        />
      </main>
    </>
  );
}
