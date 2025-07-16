"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

const page = () => {
  const auth = useUser();

  return <div>page</div>;
};

export default page;
