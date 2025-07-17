"use client";
import { SignUp } from "@clerk/nextjs";

const Page = () => (
  <div className="flex w-full min-h-screen items-center justify-center p-4">
    <SignUp path="/signup" routing="path" />
  </div>
);

export default Page;
