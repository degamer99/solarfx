import Image from "next/image";
import SolarLogo from "../../public/images/solarLogo.png";
import { useRouter } from "next/router";
import AnimatedButton from "./AnimBtn";
import Logo from "./Logo";
import { motion } from "framer-motion";

const Header = ({ onOpen }) => {
  const data = ["Home", "About", "Trading", "Platforms", "Tools", "Partners"];

  const router = useRouter();

  const style = {
    marginRight: 10,
    color: router.asPath === router.basePath ? "red" : "black",
  };

  const signup = (e) => {
    e.preventDefault();
    router.push("/signup");
  };
  const signin = (e) => {
    e.preventDefault();
    router.push("/signin");
  };
  return (
    <header className=" opacity-90 px-4 py-2 flex justify-between items-center sticky top-0"
    style={{boxShadow: "inset 0 0 40px 0 #ccc"}}>
      <Logo />
      <div>
        <nav>
          <ul className=" flex justify-between items-center text-gray-700 gap-6 max-lg:hidden">
            {data.map((value, index) => {
              return (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={index}
                  className="text-gray-700 text-base font-bold flex items-center flex-col "
                >
                  <a href="#about">{value}</a>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className=" max-md:hidden">  
        <AnimatedButton label={"Sign Up"} onClick={signup} cstyle="ml-5" />
        {/* <AnimatedButton
          label={"Sign In"}
          onClick={signin}
          cstyle="ml-5 bg-[#00000000] text-green-500 border-2 border-green-500"
        /> */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="  py-3 px-6 rounded-lg ml-5 font-semibold border text-green-500 border-green-500 hover:bg-green-700 focus:outline-none"
            onClick={signin}
          >
            Sign In
          </motion.button>
      </div>
      <button onClick={onOpen} className="text-white md:hidden">
        <svg
          width="30"
          height="24"
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
      </button>
    </header>
  );
};

export default Header;
