import Image from "next/image";
import React from "react";

import { Inter } from "next/font/google";
import Script from "next/script";

const AccountTypeInfo = [
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
  {
    name: "Standard a/c",
    motto: "New Into Trading",
    InitialDeposit: " $100",
    Leverage: "Up to 1:500",
    OrderVolume: "0.01 - 500 lots",
  },
];
// const inter = Inter({ subsets: ['latin'] })
const Header = () => {
  return (
    <header className=" flex justify-between  items-center">
      {/* <svg
        width="463.19999999999993"
        height="145.93222287546587"
        viewBox="0 0 369.89473684210526 116.53618561594108"
        className="looka-1j8o68f scale-[0.4]"
      >
        <defs id="SvgjsDefs1848"></defs>
        <g
          id="SvgjsG1849"
          featurekey="symbolFeature-0"
          transform="matrix(1.151315789473684,0,0,1.151315789473684,-11.51315789473684,-13.68914513211501)"
          fill="#159947"
        >
          <title xmlns="http://www.w3.org/2000/svg">candle_stick_cp</title>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M29,98.32H10V49.83H29ZM26.86,51.94H12.11V96.21H26.86Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M22.65,51.94H16.32V35.08h6.33ZM20.54,37.19H18.43V49.83h2.11Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M22.65,113.11H16.32V96.25h6.33ZM20.54,98.32H18.43V111h2.11Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M59.49,75.13h-19V26.64h19ZM57.38,28.75H42.62V73H57.38Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M53.16,28.75H46.84V11.89h6.32ZM51.05,14H49V26.64h2.1Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M53.16,89.92H46.84V73.06h6.32ZM51.05,75.13H49V87.78h2.1Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M90,98.32H71V49.83H90ZM87.89,51.94H73.14V96.21H87.89Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M83.68,51.94H77.35V35.08h6.33ZM81.57,37.19H79.46V49.83h2.11Z"
          ></path>
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M83.68,113.11H77.35V96.25h6.33ZM81.57,98.32H79.46V111h2.11Z"
          ></path>
        </g>
        <g
          id="SvgjsG1850"
          featurekey="nameFeature-0"
          transform="matrix(1.8156487540983515,0,0,1.8156487540983515,110.18435243633374,10.558580291160322)"
          fill="#159947"
        >
          <path d="M13.24 35 c0 -1.2 -0.4 -2.68 -4.68 -4.88 c-3.52 -1.84 -7.12 -3.72 -7.12 -8.6 c0 -4.56 4.04 -7 7.96 -7 c2.92 0 4.32 1 5.32 1 c0.52 0 0.96 -0.24 1 -0.68 l2.16 0 l0.36 6.24 l-1.32 -0.04 c-0.84 -0.04 -1.32 -0.24 -1.76 -1.12 c-1.16 -2.52 -2.72 -3.24 -4.08 -3.24 c-1.92 0 -3 1.24 -3 2.64 c0 2 1.64 3.16 4.36 4.4 c2.76 1.36 7.88 3.36 7.88 8.96 c0 5.88 -5.4 7.92 -8.52 7.92 c-3.88 0 -5.32 -1.6 -6.64 -1.6 c-1.24 0 -1.4 0.6 -1.48 1.04 l-2.24 0 l-0.44 -6.56 l1.68 0 c0.92 0 1.4 0.16 1.6 0.88 c0.68 2.8 3.76 3.88 5.92 3.88 c1.68 0 3.04 -1.16 3.04 -3.24 z M33 19.64 c4.48 0 10.44 2.68 10.44 10.16 c0 7.52 -5.96 10.6 -10.48 10.6 c-4.48 0 -10.44 -3.08 -10.44 -10.28 c0 -7.8 5.96 -10.48 10.48 -10.48 z M35.88 31.64 c0 -6.2 -1.28 -9.92 -3.36 -9.92 c-1.76 0 -2.4 2.8 -2.4 6.72 c0 6.04 1.28 9.92 3.36 9.92 c1.88 0 2.4 -2.84 2.4 -6.72 z M54.040000000000006 34.4 c0 1.56 1.12 1.84 2.68 1.72 l0 2 c-4.52 1 -7.2 2.44 -8.2 2.44 c-1.12 0 -1.48 -0.48 -1.48 -1.72 l0 -19.44 c0 -1.64 -1.12 -1.92 -2.6 -1.64 l0 -2 c4.88 -1.12 6.88 -3.4 8.24 -3.4 c1.08 0 1.36 0.6 1.36 1.76 l0 20.28 z M77.64 33.8 c0 1.56 1.12 1.96 2.68 1.56 l0 2.24 c-4.64 1.2 -7.24 2.96 -8.24 2.96 c-1.2 0 -1.72 -0.68 -1.6 -2.04 l0.32 -2.84 c-0.76 2.36 -2.16 4.88 -6.12 4.88 c-3.4 0 -6.16 -1.72 -6.16 -5.16 c0 -4.2 3.4 -6.4 11.96 -8.12 l-0.08 -3.72 c-0.08 -1.92 -0.84 -2.2 -1.52 -2.2 c-4.56 0 -1 6.36 -6.52 6.36 c-1.96 0 -2.84 -1.04 -2.84 -2.6 c0 -3.08 4.28 -5.52 9.88 -5.52 c4.12 0 8.24 0.4 8.24 5.04 l0 9.16 z M67.52000000000001 37.44 c2 0 2.84 -3.28 2.96 -4.84 l0 -3.64 c-4.44 0.84 -4.88 4.28 -4.88 5.76 c0 1.56 0.72 2.72 1.92 2.72 z M97.64 19.56 c1.88 0 3.48 1.28 3.48 3.28 c0 2.2 -1.96 3 -3.04 3 c-1.76 0 -2.72 -0.92 -3.64 -0.92 c-2.52 0 -2.72 2.76 -2.92 4.08 l0 7.48 c0 1 1 1.32 2.72 1.48 l0 2.04 c-4.12 -0.08 -8.32 -0.08 -12.44 0 l0 -2.04 c1.44 -0.16 2.52 -0.48 2.52 -1.48 l0 -10.08 c0 -1.64 -1.12 -1.88 -2.6 -1.6 l0 -2.04 c4.88 -1.08 7.08 -3.44 8.36 -3.44 c1.16 0 1.6 0.76 1.44 2.08 l-0.6 4.36 c1.48 -4.56 3.68 -6.2 6.72 -6.2 z M113.52000000000001 12.719999999999999 c3.36 0 7.08 1.44 7.08 4.48 c0 1.44 -0.76 2.32 -2.16 2.32 c-3.08 0 -2.04 -4.28 -4.16 -4.28 c-1.72 0 -2.48 1.08 -2.48 4.72 l3.08 0 c0.52 0 0.68 0.24 0.68 0.76 l0 0.68 c0 0.52 -0.16 0.76 -0.68 0.76 l-3.08 0 l0 14.32 c0 1 1.08 1.32 2.68 1.48 l0 2.04 c-4.08 -0.12 -8.28 -0.12 -12.36 0 l0 -2.04 c1.4 -0.16 2.56 -0.48 2.56 -1.48 l0 -14.32 l-1.68 0 c-0.52 0 -0.68 -0.24 -0.68 -0.76 l0 -0.68 c0 -0.52 0.16 -0.76 0.68 -0.76 l1.68 0 c0.16 -5.64 4.8 -7.24 8.84 -7.24 z M142.4 37.92 l0.64 0.04 l0 2.04 c-3.76 -0.12 -7.64 -0.12 -11.32 0 l0 -2.08 l0.96 0 c0.6 -0.08 0.44 -0.56 -0.12 -1.56 l-1.52 -2.4 l-1.64 2.16 c-0.72 0.96 -0.56 1.8 0.12 1.8 l1.8 0 l0 2.08 c-3.16 -0.12 -6.56 -0.12 -9.72 0 l0 -2.04 l0.52 -0.04 c2.4 -0.4 2.96 -1 4.2 -2.52 l3.04 -4 l-4.72 -7.36 c-1 -1.64 -1.76 -1.84 -2.56 -2 l-0.64 -0.08 l0 -2 l11.52 0 l0 2.04 l-1 0.04 c-0.56 0.08 -0.52 0.56 0.04 1.56 l1.56 2.36 l1.6 -2.12 c0.72 -0.96 0.48 -1.8 -0.24 -1.8 l-1.64 -0.04 l0 -2.04 l9.6 0 l0 2 l-0.48 0.08 c-2.44 0.4 -3.04 0.92 -4.2 2.52 l-3 3.92 l4.92 7.44 c1 1.6 1.4 1.84 2.28 2 z"></path>
        </g>
      </svg> */}

      <svg
        className=" scale-[0.25]"
        // width="30"
        // height="24"
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.9286 4.15816H1.07143C0.596178 4.15816 0.25 3.81093 0.25 3.42857V0.979592C0.25 0.597237 0.596178 0.25 1.07143 0.25H28.9286C29.4038 0.25 29.75 0.597237 29.75 0.979592V3.42857C29.75 3.81093 29.4038 4.15816 28.9286 4.15816ZM28.9286 13.9541H1.07143C0.596178 13.9541 0.25 13.6068 0.25 13.2245V10.7755C0.25 10.3932 0.596178 10.0459 1.07143 10.0459H28.9286C29.4038 10.0459 29.75 10.3932 29.75 10.7755V13.2245C29.75 13.6068 29.4038 13.9541 28.9286 13.9541ZM28.9286 23.75H1.07143C0.596178 23.75 0.25 23.4028 0.25 23.0204V20.5714C0.25 20.1891 0.596178 19.8418 1.07143 19.8418H28.9286C29.4038 19.8418 29.75 20.1891 29.75 20.5714V23.0204C29.75 23.4028 29.4038 23.75 28.9286 23.75Z"
          fill="#2B2B2B"
          stroke="#2B2B2B"
          strokeWidth="0.5"
        />
      </svg>
    </header>
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

const MiniChartSection = () => {
  return ( <section className=" grid grid-cols-1 gap-2 place-items-center md:grid-cols-2 lg:grid-cols-4">
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
    <section>
      <p className=" text-center"> Account Types </p>
      <h2 className=" text-center">
        Solarfx Trading <span className="text-green-500">Accounts</span>
      </h2>
      <div className=" grid grid-cols-1 gap-5 place-items-center md:grid-cols-3">
      {
        AccountTypeInfo.map(({InitialDeposit, Leverage, OrderVolume, name, motto, }, index) => {
          return <ul key={index} className="rounded py-1 w-11/12 m-auto border-solid border-2 border-gray-500">
            <li className="text-center">
              <h3 className="font-bold font-sans text-lg"> {name} </h3>
              <p className="font-bold font-sans text-xl"> {motto} </p>
              <img src="" alt="" />
            </li>
            <li className="bg-gray-200 text-gray-700 flex justify-between text-xl px-3 py-2"><span>Initial Deposit</span> <span className="text-right">{InitialDeposit}</span></li>
            <li className="flex justify-between text-xl px-3 py-2"><span>Order Volume</span> <span className="text-right ">{OrderVolume}</span></li>
            <li className="bg-gray-200 text-gray-700 flex justify-between px-3 py-2 text-xl"><span>Leverage</span> <span className="text-right">{Leverage}</span></li>
            <button className="flex justify-center m-12">Open</button>

          </ul>
        })
      }
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
  return (
    <>
      {/* <Header /> */}
      <Ticker />
      <MiniChartSection />
      <AccountType />
      <Footer />
    </>
  );
}
