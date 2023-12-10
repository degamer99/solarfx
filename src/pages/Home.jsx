import { useState, createRef, useEffect } from "react";
import { motion } from "framer-motion";
import HeaderDash from "@/components/HeaderDash";
import HomeDashboard from "@/components/HomeDashboard";
import SidebarHome from "@/components/SidebarHome";

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const Heatmap = (props) => {
    const { widgetProps, widgetPropsAny } = props;

    const ref = createRef();


    useEffect(() => {
      let refValue;
      let w = window.innerWidth -20

      if (ref.current) {
        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";

        script.async = true;
        script.type = "text/javascript";
        script.innerHTML = JSON.stringify({
          width: w,
          height: 400,
          currencies: [
            "EUR",
            "USD",
            "JPY",
            "GBP",
            "CHF",
            // "AUD",
            // "CAD",
            // "NZD",
            // "CNY",
          ],
          isTransparent: false,
          colorTheme: "dark",
          locale: "en",
          // ...widgetProps,
          // ...widgetPropsAny,
        });

        ref.current.appendChild(script);
        refValue = ref.current;
      }

      return () => {
        if (refValue) {
          while (refValue.firstChild) {
            refValue.removeChild(refValue.firstChild);
          }
        }
      };
    }, [ref, widgetProps, widgetPropsAny]);

    return <div ref={ref} className="mx-auto [&>div]:mx-auto" />;
  };

  //   <!-- TradingView Widget BEGIN -->
  // <div class="tradingview-widget-container">
  //   <div class="tradingview-widget-container__widget"></div>
  //   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
  //   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js" async>
  //   {
  //   "width": 770,
  //   "height": 400,
  //   "currencies": [
  //     "EUR",
  //     "USD",
  //     "JPY",
  //     "GBP",
  //     "CHF",
  //     "AUD",
  //     "CAD",
  //     "NZD",
  //     "CNY"
  //   ],
  //   "isTransparent": false,
  //   "colorTheme": "dark",
  //   "locale": "en"
  // }
  //   </script>
  // </div>
  // <!-- TradingView Widget END -->

  return (
    <>
      <HeaderDash onOpen={handleOpenSidebar} />
      <SidebarHome isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <HomeDashboard />
      <Heatmap />
    </>
  );
};

export default Home;
