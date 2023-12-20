import CopyrightFooter from "@/components/Copyright";
import { firestore } from "@/components/Firebase";
import HeaderDash from "@/components/HeaderDash";
import { collection, getDocs, doc, } from "firebase/firestore";
import { useEffect, useState } from "react";

const Secret = () => {
  const[AllUserData, setAllUserData] = useState([ ])

  useEffect( () => {
    // const userRef = doc(firestore, "users", user.uid);
    const getAllUserData = async () =>{
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        setAllUserData( x => [...x, doc.data()])
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
      // console.log("all data", AllUserData)
    }
    getAllUserData()
  }, [])

    return(<>
      <HeaderDash /> 
      {/* {AllUserData.map} */}
      <main className="mt-4">
      {AllUserData.map((item, index) => (
          <section key={index} className="bg-white shadow-md rounded p-6 my-4">
            <h2>User Information</h2>
            <form className="space-y-4">
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-gray-700">{key}</label>
                  <input
                    type={typeof value === 'string' ? 'text' : 'number'}
                    id={key}
                    name={key}
                    value={value}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    // readOnly
                  />
                </div>
              ))}
            </form>
          </section>
        ))}

      </main>
      <CopyrightFooter />
    </>
    );
}

export default Secret