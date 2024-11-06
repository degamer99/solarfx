import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../components/Firebase";
import { onAuthStateChanged } from "firebase/auth";
// import Script from "next/script";
import { AuthProvider } from "@/components/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <>
    <AuthProvider >

      // <Script src="//code.tidio.co/kryrf6lki4rnjdqqopvqtinvjdqko7ms.js" async />
      <Component {...pageProps} />
    </AuthProvider>
    </>
  );
}
