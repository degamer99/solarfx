import Image from "next/image";
import React from "react";

import { Inter } from "next/font/google";
import Script from "next/script";

const Header = () => {
  return <h1> Header</h1>;
};

const Form = () => {
  return (
    <section>
      <h2 className=" border-l-8 p-4 my-2 mx-4 rounded-sm font-semibold border-emerald-500">
        {" "}
        Open Account
      </h2>
      <div>
        <div></div>
        <div className=" flex flex-col">
          <label htmlFor="first">First Name</label>
          <input type="text" id="first" />
          <label htmlFor="last">Last Name</label>
          <input type="text" id="last" />
          <button> Next </button>
        </div>
      </div>
    </section>
  );
};

export default function SignIn() {
  return (
    <>
      <Header />
      <Form />
    </>
  );
}
