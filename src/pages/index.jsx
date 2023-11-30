import Image from "next/image";
import React from "react";
import { useState } from "react";
import MastercardLogo from "../../public/images/mastercard-logo.webp";
import NetellerLogo from "../../public/images/neteller-logo.webp";
import PaypalLogo from "../../public/images/paypal-logo.webp";
import skrillLogo from "../../public/images/skrill-logo.webp";
import VisaLogo from "../../public/images/visa-logo.webp";
import WireLogo from "../../public/images/wiretransfer-logo.webp";
import SolarLogo from "../../public/images/solarLogo.png";
import CandleIcon from "../../public/images/CandleIcon.png";
import { Inter } from "next/font/google";
import Script from "next/script";

const AccountTypeInfo = [
  {
    name: "Standard a/c",
    motto: "New Into Trading ....",
    InitialDeposit: " $100",
    Leverage: "Up to 1:500",
    OrderVolume: "0.01 - 500 lots",
  },
  {
    name: "Standard a/c",
    motto: "New Into Trading",
    InitialDeposit: " $100",
    Leverage: "Up to 1:500",
    OrderVolume: "0.01 - 500 lots",
  },
  {
    name: "Standard a/c",
    motto: "New Into Trading",
    InitialDeposit: " $100",
    Leverage: "Up to 1:500",
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
// const inter = Inter({ subsets: ['latin'] })
const Header = ({ state }) => {
  return (
    <header className=" py-4 px-5 flex justify-between items-center border-b-2 shadow-md bg-black sticky top-0">
      <Image
        style={{ width: "8rem" }}
        // className=" scale-50"
        // style={{ width: "80%" }}
        src={SolarLogo}
        alt="My Image"
        unoptimized
        // width={40}
      />
      <div className=" flex justify-between gap-10">
        <ul className=" flex justify-between items-center max-md:hidden md:visble text-gray-200 gap-4 text-lg">
          <li>Home</li>
          <li>Account Plans</li>
          <li> About Us</li>
          <li>Contact Us</li>
        </ul>
        <div className=" flex justify-between gap-4 max-md:hidden">
          <button
            className="py-2 px-3  rounded-sm bg-green-400 leading-none shadow-green-300"
            style={{ boxShadow: "inset 0 0 10px 5px #00FF00cc" }}
          >
            Sign Up
          </button>
          <button
            className="py-2 px-3  rounded-sm bg-green-400 leading-none shadow-green-300"
            style={{ boxShadow: "inset 0 0 10px 5px #00FF00cc" }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div onClick={() => state((x) => !x)} className="md:hidden">
        <svg
          width="30"
          height="24"
          viewBox="0 0 30 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.9286 4.15816H1.07143C0.596178 4.15816 0.25 3.81093 0.25 3.42857V0.979592C0.25 0.597237 0.596178 0.25 1.07143 0.25H28.9286C29.4038 0.25 29.75 0.597237 29.75 0.979592V3.42857C29.75 3.81093 29.4038 4.15816 28.9286 4.15816ZM28.9286 13.9541H1.07143C0.596178 13.9541 0.25 13.6068 0.25 13.2245V10.7755C0.25 10.3932 0.596178 10.0459 1.07143 10.0459H28.9286C29.4038 10.0459 29.75 10.3932 29.75 10.7755V13.2245C29.75 13.6068 29.4038 13.9541 28.9286 13.9541ZM28.9286 23.75H1.07143C0.596178 23.75 0.25 23.4028 0.25 23.0204V20.5714C0.25 20.1891 0.596178 19.8418 1.07143 19.8418H28.9286C29.4038 19.8418 29.75 20.1891 29.75 20.5714V23.0204C29.75 23.4028 29.4038 23.75 28.9286 23.75Z"
            fill="#2B2B2B"
            stroke="#2B2B2B"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      {/* <Image
        // className="scale-50"
        // style={{ width: "80%" }}
        src={CandleIcon}
        alt="My Image"
        width={40}
      /> */}
    </header>
  );
};

const Nav = ({ state }) => {
  return (
    <ul className="fixed h-full w-full bg-black text-gray-50 z-10 ">
      <li onClick={() => state((x) => !x)}>Quickstart</li>
      <li>Home</li>
      <li>Accounts</li>
      <li>About Us</li>
      <li>
        <button>Sign In</button>
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

const Hero = () => {
  return <section></section>;
};

const MiniChartSection = () => {
  return (
    <section className=" grid grid-cols-1 gap-2 place-items-center md:grid-cols-2 lg:grid-cols-4">
      <MiniChart />
      <MiniChart />
      <MiniChart />
      <MiniChart />
    </section>
  );
};

const MiniChart = (props) => {
  const { widgetProps, widgetPropsAny } = props;

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
        symbol: "FX:EURUSD",
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

  return <div ref={ref} />;
};

const AccountType = () => {
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
                style={{ boxShadow: "inset 0 0 20px #ccc "}}
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
                <li className=" text-7xl font-bold py-10">{InitialDeposit}</li> 
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
                <button className=" py-3 px-10 my-2 block mx-auto bg-green-600 let text-gray-100 rounded-lg font-bold text-xl wor shadow-inner">
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
        <h3 className=" text-xl font-bold">Your money, Your way</h3>
        <ul className=" grid grid-cols-2">
          <li className=" font-bold text-gray-600 p-2">Instant Deposit</li>
          <li className=" font-bold text-gray-600">Fast Withdrawals </li>
          <li className=" font-bold text-gray-600">0% Commision </li>
        </ul>
        <button className="py-2 px-4 bg-slate-400">Payment Methods</button>
      </div>
      <div className=" grid grid-cols-3 place-items-center gap-4">
        {PaymentInfo.map((value, index) => {
          return (
            <span className="min-w-[6.5rem] h-16 flex items-center justify-center">
              <Image
                className=" h-auto"
                key={index}
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

const Footer = () => {
  return (
    <footer>
      <div>
        <section></section>
        <section>
          <h4>Useful Links</h4>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </section>
        <section></section>
      </div>
    </footer>
  );
};

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? <Nav state={setOpen} /> : <span></span>}

      <Header state={setOpen} />
      <Ticker />
      {/* <MiniChartSection /> */}
      <AccountType />
      <PaymentMethods />
      <Footer />
    </>
  );
}
