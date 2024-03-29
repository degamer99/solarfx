import { createRef, useEffect } from "react";

const Ticker = (props) => {
    const { widgetProps, widgetPropsAny } = props;
  
    const ref = createRef();
  
    useEffect(() => {
      let refValue;
  
      if (ref.current) {
        const script = document.createElement("script");
        // script.src =
        //   "https://s3.tradingview.com/external-embedding/" +
        //   "embed-widget-ticker-tape.js";
        script.src =
          "https://s3.tradingview.com/external-embedding/" +
          "embed-widget-tickers.js";
  
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

  export default Ticker;