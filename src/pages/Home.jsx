import { useState, createRef, useEffect } from "react";
import { auth, firestore } from "../components/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

import HeaderDash from "@/components/HeaderDash";
import HomeDashboard from "@/components/HomeDashboard";
import SidebarHome from "@/components/SidebarHome";
import TIcker from "@/components/ticker";
import CopyrightFooter from "@/components/Copyright";
import { useRouter } from "next/router";
// import { getFirestore, doc, getDoc, updateDoc} from "firebase/firestore"
import { doc, setDoc, collection, getDoc } from "firebase/firestore";

import TradingViewWidget from "../components/TradingVIew";

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
      let w = window.innerWidth - 20;

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
  const router = useRouter();

  const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Function to retrieve data from Firestore
  //   const fetchData = async () => {
  //     const firestore = getFirestore(app);
  //     const docRef = doc(firestore, 'yourCollection', 'yourDocument'); // Replace with your collection and document names

  //     try {
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         setData(docSnap.data());
  //       } else {
  //         console.log('No such document!');
  //       }
  //     } catch (error) {
  //       console.error('Error getting document:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Fetch data on component mount

  const updateData = async () => {
    // Function to update data in Firestore
    const firestore = getFirestore(app);
    const docRef = doc(firestore, "yourCollection", "yourDocument"); // Replace with your collection and document names

    try {
      await updateDoc(docRef, {
        // Update fields as needed
        field1: "new value",
        field2: "new value",
        // ...
      });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserAuthInfo = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log("ther is a user", uid);
            const userRef = doc(firestore, "users", user.uid);
            try {
              await getDoc(userRef).then((file) => {
                setUserData(file.data());
                if (file.data().email == "admin@gmail.com") router.push("/secret")
              } )
            } catch (err) {
              console.log(err);
            } 
            // finally {
            //   if (userData != null && userData.email == "admin@gmail.com") {
            //     console.log("admin is in control")
            //     router.push("/secret");
            //   }
            // }
            // ...b
            console.log("done");
            // console.log("this is user Data", userData)
          } else {
            // User is signed out
            // ...
            console.log("ther is no user");
            // router.push("/signin");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getUserAuthInfo();
  }, []);

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
      <TIcker />
      <HomeDashboard data={userData} />
      <Heatmap />
      <TradingViewWidget />
      <CopyrightFooter />
    </>
  );
};

export default Home;
