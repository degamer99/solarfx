import Image from "next/image";
import SolarLogo from "../../public/images/solarLogo.png";
import User from "../../public/images/user-solid.svg";
import { useRouter } from "next/router";

const HeaderDash = ({ onOpen }) => {
  const router = useRouter();

  let clickAndHoldTimer;

  const secretFunction = () => {
    // Replace this with your secret function
    alert("Secret function activated!");
    router.push("/secret");
  };

  const handleMouseDown = () => {
    clickAndHoldTimer = setTimeout(() => {
      secretFunction();
    }, 10000);
  };

  const handleMouseUp = () => {
    clearTimeout(clickAndHoldTimer);
  };

  return (
    <header
      className="bg-white text-black p-4 flex justify-between sticky top-0"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ boxShadow: "inset 0 0 40px 0 #ccc" }}
    >
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

      <Image
        style={{ width: "8rem" }}
        // className=" scale-50"
        // style={{ width: "80%" }}
        src={SolarLogo}
        alt="My Image"
        unoptimized
        // width={40}
      />
      {/* <div></div> */}
      <Image
        style={{ width: "2rem" }}
        // className=" scale-50"
        // style={{ width: "80%" }}
        src={User}
        alt="My Image"
        unoptimized
        // width={10}
        // height={10}
      />
    </header>
  );
};

export default HeaderDash;
