import CopyrightFooter from "@/components/Copyright";
import HeaderDash from "@/components/HeaderDash";
import Sidebar from "@/components/SidebarHome";
import Ticker from "@/components/ticker";
import { useState } from "react";

export default function Trade() {
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
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <Ticker />
      <CopyrightFooter />
    </>
  );
}
