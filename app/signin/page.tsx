import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignIn redirectUrl={"/"} />
    </div>
  );
};

export default page;
