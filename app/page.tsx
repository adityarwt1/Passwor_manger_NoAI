import React from "react";
import PasswordCard from "@/components/PasswordCard";
import connectDB from "@/lib/mongodb";
import { auth, currentUser } from "@clerk/nextjs/server";
import Password from "@/models/Password";

const ParentComponent: React.FC = async () => {
  const authData = await currentUser();
  const username = authData?.username;
  console.log(username);
  await connectDB();
  const passwords = await Password.find({ username });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {passwords.map((password) => (
        <PasswordCard key={password._id?.toString()} passwordData={password} />
      ))}
    </div>
  );
};

export default ParentComponent;
