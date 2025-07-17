import React from "react";
import PasswordCard from "@/components/PasswordCard";
import connectDB from "@/lib/mongodb";
import { auth, currentUser } from "@clerk/nextjs/server";
import Password from "@/models/Password";
import { redirect } from "next/navigation";

const ParentComponent: React.FC = async () => {
  const authData = await currentUser();
  if (!authData) {
    redirect("/signin");
  }
  const username = authData?.username;
  await connectDB();
  const passwords = (await Password.find({ username })).map((doc) => ({
    _id: doc._id.toString(),
    plateform: doc.plateform,
    username: doc.username,
    password: doc.password,
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {passwords.length > 0 ? (
        passwords.map((password) => (
          <PasswordCard
            key={password._id?.toString()}
            passwordData={password}
          />
        ))
      ) : (
        <div className="flex ">
          <div>No password added.....</div>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
