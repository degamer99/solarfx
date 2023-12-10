import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import MastercardLogo from "../../public/images/mastercard-logo.webp";
import NetellerLogo from "../../public/images/neteller-logo.webp";
import PaypalLogo from "../../public/images/paypal-logo.webp";
import skrillLogo from "../../public/images/skrill-logo.webp";
import VisaLogo from "../../public/images/visa-logo.webp";
import WireLogo from "../../public/images/wiretransfer-logo.webp";
import CandleIcon from "../../public/images/CandleIcon.png";
import Currency from "../../public/images/currency.webp";
import Stocks from "../../public/images/stocks.webp";
import Commodities from "../../public/images/commodities.webp";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

const AccountTypeInfo = [
  {
    name: "Beginner a/c",
    motto: "New Into Trading ....",
    InitialDeposit: " $100",
    Leverage: "Up to 1:100",
    OrderVolume: "0.1 - 50 lots",
  },
  {
    name: "Standard a/c",
    motto: "Already Into Trading ....",
    InitialDeposit: " $500",
    Leverage: "Up to 1:500",
    OrderVolume: "0.01 - 200 lots",
  },
  {
    name: "Master a/c",
    motto: "Expert In Trading ....",
    InitialDeposit: " $1000",
    Leverage: "Up to 1:1000",
    OrderVolume: "0.01 - 500 lots",
  },
];

const PaymentInfo = [
  MastercardLogo,
  NetellerLogo,
  PaypalLogo,
  VisaLogo,
  WireLogo,
  skrillLogo,
];

const GlobalMarketsInfo = [
  {
    img: Currency,
    h4: "Currency",
    p: "Trade in the world's largest market with access to all global currencies",
  },
  {
    img: Stocks,
    h4: "Stocks",
    p: "Trade stocks of the biggest names in the international stocks market",
  },
  {
    img: Commodities,
    h4: "Commodities",
    p: "Diversify your financial portfolio and trade oil, natural gas and metals",
  },
];
// const inter = Inter({ subsets: ['latin'] })
// const Header = ({ state }) => {
//   return (
//     <header className=" py-4 px-5 flex justify-between items-center shadow-md bg-black sticky top-0">
//       <Image
//         style={{ width: "8rem" }}
//         // className=" scale-50"
//         // style={{ width: "80%" }}
//         src={SolarLogo}
//         alt="My Image"
//         unoptimized
//         // width={40}
//       />
//       <div className=" flex justify-between gap-10">
//         <ul className=" flex justify-between items-center max-md:hidden md:visble text-gray-200 gap-4 text-lg">
//           <li>Home</li>
//           <li>Account Plans</li>
//           <li> About Us</li>
//           <li>Contact Us</li>
//         </ul>
//         <div className=" flex justify-between gap-4 max-md:hidden">
//           <button
//             className="py-2 px-3  rounded-sm bg-green-400 leading-none shadow-green-300"
//             style={{ boxShadow: "inset 0 0 10px 5px #00FF00cc" }}
//           >
//             <Link href="/signin">Sign Up</Link>
//           </button>
//           <button
//             className="py-2 px-3  rounded-sm bg-green-400 leading-none shadow-green-300"
//             style={{ boxShadow: "inset 0 0 10px 5px #00FF00cc" }}
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//       <div onClick={() => state((x) => !x)} className="md:hidden">
//         <svg
//           width="30"
//           height="24"
//           viewBox="0 0 30 24"
//           fill="white"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M28.9286 4.15816H1.07143C0.596178 4.15816 0.25 3.81093 0.25 3.42857V0.979592C0.25 0.597237 0.596178 0.25 1.07143 0.25H28.9286C29.4038 0.25 29.75 0.597237 29.75 0.979592V3.42857C29.75 3.81093 29.4038 4.15816 28.9286 4.15816ZM28.9286 13.9541H1.07143C0.596178 13.9541 0.25 13.6068 0.25 13.2245V10.7755C0.25 10.3932 0.596178 10.0459 1.07143 10.0459H28.9286C29.4038 10.0459 29.75 10.3932 29.75 10.7755V13.2245C29.75 13.6068 29.4038 13.9541 28.9286 13.9541ZM28.9286 23.75H1.07143C0.596178 23.75 0.25 23.4028 0.25 23.0204V20.5714C0.25 20.1891 0.596178 19.8418 1.07143 19.8418H28.9286C29.4038 19.8418 29.75 20.1891 29.75 20.5714V23.0204C29.75 23.4028 29.4038 23.75 28.9286 23.75Z"
//             fill="#2B2B2B"
//             stroke="#2B2B2B"
//             strokeWidth="0.5"
//           />
//         </svg>
//       </div>
//       {/* <Image
//         // className="scale-50"
//         // style={{ width: "80%" }}
//         src={CandleIcon}
//         alt="My Image"
//         width={40}
//       /> */}
//     </header>
//   );
// };

const Nav = ({ state }) => {
  return (
    <ul className="fixed h-full w-full bg-black text-gray-50 z-10 ">
      <li onClick={() => state((x) => !x)}>Quickstart</li>
      <li>Home</li>
      <li>Accounts</li>
      <li>About Us</li>
      <li>
        <button>
          <Link href="/signin">Sign In no</Link>
        </button>
      </li>
      <li>
        <button>Sign Up</button>
      </li>
    </ul>
  );
};

const Ticker = (props) => {
  const { widgetProps, widgetPropsAny } = props;

  const ref = React.createRef();

  React.useEffect(() => {
    let refValue;

    if (ref.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/" +
        "embed-widget-ticker-tape.js";

      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        colorTheme: "dark",
        isTransparent: false,
        showSymbolLogo: true,
        locale: "en",
        symbols: [
          {
            proName: "FOREXCOM:SPXUSD",
            title: "S&P 500",
          },
          {
            proName: "FOREXCOM:NSXUSD",
            title: "Nasdaq 100",
          },
          {
            proName: "FX_IDC:EURUSD",
            title: "EUR/USD",
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "BTC/USD",
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "ETH/USD",
          },
        ],
        ...widgetProps,
        ...widgetPropsAny,
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

  return <div ref={ref} />;
};

const HeroData = [
  {
    head: "Our Insight, Your Evolution",
    p: "Lorem is the honest truth th light ",
  },
  // { head: "Our Insight, Your Evolution", p: "Lorem is the honest truth th light " },
  // { head: "Our Insight, Your Evolution", p: "Lorem is the honest truth th light " },
  // { head: "Our Insight, Your Evolution", p: "Lorem is the honest truth th light " },
];

// const Hero = () => {
//   return (
//     <section
//       className="h-[60vh] md:h-[80vh]"
//       style={{
//         // use the src property of the image object
//         backgroundImage: `url(${Hero1.src})`,
//         // other styles
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         width: "100%",
//         // height: "100vh",

//         display: "flex",
//         alignItems: "center",
//         // justifyContent: "center",
//       }}
//     >
//       {HeroData.map(({ head, p }, index) => {
//         return (
//           <div key={index} className="my-auto">
//             <h2 className=" text-2xl text-left">{head}</h2>
//             <p>{p}</p>
//           </div>
//         );
//       })}
//     </section>
//   );
// };

const MiniChartData = ["FX:EURUSD", "BITSTAMP:BTCUSD", "NASDAQ:MSFT"]

const MiniChartSection = () => {
  return (
    <section className=" py-5 ">
      <div className=" px-4">
        <p className=" text-center text-xl font-bold text-gray-400">
          Forex Trading
        </p>
        <h2 className=" text-center text-5xl text-gray-800 font-bold my-4">
          Top <span className="text-green-500">Pricing</span> List in Market
        </h2>
      </div>
      <div className=" grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 my-6">
      {MiniChartData.map( ( value, index) => {
        return(<MiniChart  data={value} key={index} />);
      })}
      </div>
    </section>
  );
};


const MiniChart = (props) => {
  const { widgetProps, widgetPropsAny, data } = props;

  const ref = React.createRef();

  React.useEffect(() => {
    let refValue;

    if (ref.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";

      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        symbol: `${data}`,
        width: 350,
        height: 220,
        locale: "en",
        dateRange: "12M",
        colorTheme: "dark",
        isTransparent: false,
        autosize: false,
        largeChartUrl: "",
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

  return <div ref={ref} className=" mt-2 " />;
};

const GlobalMarkets = () => {
  return (
    <section className=" bg-[#f5f8f7] py-8">
      <p className=" text-center text-xl font-bold text-gray-400">
        {" "}
        Investment Options{" "}
      </p>
      <h2 className=" text-center text-5xl text-gray-800 font-bold my-4">
        Access and Trade <span className="text-green-500">Global Markets</span>
      </h2>
      <div className=" grid grid-cols-1 gap-5 place-items-center md:grid-cols-3">
        {GlobalMarketsInfo.map(({ img, h4, p }, index) => {
          return (
            <ul
              key={index}
              className=" text-center rounded-md py-3 w-11/12 m-auto mt-8 border-solid border border-gray-300 bg-white shadow-[ 0 0 10px 5px black]"
              style={{ boxShadow: "0 0 30px #ddddddaa " }}
            >
              <li className=" flex justify-center py-10">
                <Image
                  className=" h-auto"
                  src={img}
                  alt="My Image"
                  height={70}
                  // width={40}
                  unoptimized
                />
              </li>
              <li>
                <h4 className=" text-4xl font-bold pt-4 pb-2 text-gray-800">
                  {h4}
                </h4>
              </li>
              <li>
                {" "}
                <p className="text-gray-500 flex justify-between text-xl px-6 pb-5 font-bold">
                  {p}
                </p>
              </li>
              <button className=" py-3 px-10 my-2 block mx-auto bg-gray-600 text-gray-100 rounded-lg font-bold text-xl wor shadow-inner">
                Open
              </button>
            </ul>
          );
        })}
      </div>
    </section>
  );
};
const AccountType = () => {
  const router = useRouter();
  return (
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
          ({ InitialDeposit, Leverage, OrderVolume, name, motto }, index) => {
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
                  <p className=" text-7xl font-bold py-10">{InitialDeposit}</p>
                </li>
                <li className="bg-gray-200 text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                  <span>Initial Deposit</span>{" "}
                  <span className="text-right">{InitialDeposit}</span>
                </li>
                <li className=" text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                  <span>Order Volume</span>{" "}
                  <span className="text-right ">{OrderVolume}</span>
                </li>
                <li className="bg-gray-200 text-gray-500 flex justify-between text-xl px-6 py-4 font-bold">
                  <span>Leverage</span>{" "}
                  <span className="text-right">{Leverage}</span>
                </li>
                <button 
                onClick={() => router.push("/signup")}
                className=" py-3 px-10 my-2 block mx-auto bg-gray-500 text-gray-100 rounded-lg font-bold text-xl wor shadow-inner">
                  Open
                </button>
              </ul>
            );
          }
        )}
      </div>
    </section>
  );
};

const PaymentMethods = () => {
  return (
    <section className=" flex justify-between md:flex-row flex-col bg-gray-300 rounded m-4 py-4 px-3">
      <div>
        <h3 className=" text-3xl font-bold">Your money, Your way</h3>
        <ul className=" grid grid-cols-2">
          <li className=" font-bold text-gray-600 p-2 flex text-xl items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                opacity="1"
                fill="#22C55E"
                d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM227.3 387.3l184-184c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0L216 308.1l-70.1-70.1c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l104 104c6.2 6.2 16.4 6.2 22.6 0z"
              />
            </svg>
            Instant Deposit
          </li>
          <li className=" font-bold text-gray-600 p-2 flex text-xl items-center gap-2">
            <svg
              className="text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                opacity="1"
                fill="#22C55E"
                d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM227.3 387.3l184-184c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0L216 308.1l-70.1-70.1c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l104 104c6.2 6.2 16.4 6.2 22.6 0z"
              />
            </svg>
            Fast Withdrawals{" "}
          </li>
          <li className=" font-bold text-gray-600 p-2 flex text-xl items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path
                opacity="1"
                fill="#22C55E"
                d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM227.3 387.3l184-184c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0L216 308.1l-70.1-70.1c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l104 104c6.2 6.2 16.4 6.2 22.6 0z"
              />
            </svg>
            0% Commision{" "}
          </li>
        </ul>
        <button className="py-2 px-4 bg-slate-400 font-bold text-xl rounded">
          Payment Methods
        </button>
      </div>
      <div className=" grid grid-cols-3 place-items-center gap-4 max-md:py-5">
        {PaymentInfo.map((value, index) => {
          return (
            <span
              className="min-w-[6.5rem] h-16 flex items-center justify-center"
              key={index}
            >
              <Image
                className=" h-auto"
                src={value}
                alt="My Image"
                // width={40}
                unoptimized
              />
            </span>
          );
        })}
      </div>
    </section>
  );
};

// const Footer = () => {
//   return (
//     <footer>
//       <div>
//         <section>
//           <img src={SolarLogo} alt="" />
//           <div>
//             <p>
//               Since <span>2012</span>
//             </p>
//             <p>
//               More
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 height="16"
//                 width="16"
//                 viewBox="0 0 512 512"
//               >
//                 <path
//                   opacity="1"
//                   fill="#1E3050"
//                   d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"
//                 />
//               </svg>
//             </p>
//           </div>
//           <p>
//             {" "}
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
//             temporibus repellendus consequuntur vitae, voluptatem aliquid
//             expedita? Fuga culpa consequatur ut repellendus labore nobis tempore
//             explicabo.
//           </p>
//         </section>
//         <section>
//           <h4> Useful Links</h4>
//           <ul>
//             <li>Home</li>
//             <li>About Us</li>
//             <li>Contact</li>
//             <li>Our Accounts</li>
//             <li></li>
//             <li></li>
//           </ul>
//         </section>
//         <section>
//           <h4>Contact Us</h4>
//           <ul>
//             <li></li>
//             <li></li>
//             <li></li>
//             <li></li>
//           </ul>
//         </section>
//       </div>
//     </footer>
//   );
// };

export default function Home() {
  const [open, setOpen] = useState(false);

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleButtonClick = () => {
    // Handle button click logic
    console.log('Button clicked!');
  };


  return (
    <>
      <div>
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        <motion.div
          className="flex-1 flex flex-col relative z"
          initial={{ right: 0, filter: "opacity(1)" }}
          animate={{
            right: isSidebarOpen ? 90 : 0,
            filter: isSidebarOpen ? "opacity(0.5)" : "opacity(1)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Header onOpen={handleOpenSidebar} />
          {/* Your page content goes here */}
          {/* <div className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <h2 className="text-3xl font-bold">
            Welcome to Your Next.js App
          </h2>
        </div> */}
          {open ? <Nav state={setOpen} /> : <span></span>}
          {/* <Header state={setOpen} /> */}
          <Ticker />
          <HeroSection />
          <GlobalMarkets />
          <MiniChartSection />
          <AccountType />
          <PaymentMethods />
          <Footer />
        </motion.div>
      </div>
    </>
  );
}
