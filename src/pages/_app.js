import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { auth } from "../components/Firebase"
import { onAuthStateChanged } from "firebase/auth";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("there is a user")
        // ...
      } else {
        // User is signed out
        // ...
        console.log("ther is no user" + router.basePath );
        // router.push("/")
      }
    });

  }, [])
  return <Component {...pageProps} />
}
