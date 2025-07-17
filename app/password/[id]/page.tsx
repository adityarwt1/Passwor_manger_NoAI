import connectDB from "@/lib/mongodb";
import Password from "@/models/Password";
import React from "react";
import jwt from "jsonwebtoken";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await connectDB();
  const password = await Password.findOne({ _id: id });
  const decodedpassword = jwt.verify(password.password, password.username);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4 border-b pb-2">
        🔐 Password Details
      </h1>

      <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
        <p>
          <span className="font-semibold text-zinc-600 dark:text-zinc-400">
            👤 Username:
          </span>{" "}
          {password.username}
        </p>
        <p>
          <span className="font-semibold text-zinc-600 dark:text-zinc-400">
            🖥️ Platform:
          </span>{" "}
          {password.plateform}
        </p>
        <p className="break-all">
          <span className="font-semibold text-zinc-600 dark:text-zinc-400">
            🔑 Password:
          </span>{" "}
          {typeof decodedpassword === "string"
            ? decodedpassword
            : JSON.stringify(decodedpassword)}
        </p>
      </div>
    </div>
  );
};

export default page;
