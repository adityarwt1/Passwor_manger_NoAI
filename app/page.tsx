"use client";
import React, { useEffect, useState } from "react";
import PasswordCard from "@/components/PasswordCard";
import { Password } from "@/types/Password";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ParentComponent: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchPassword = async () => {
      const username = user?.username;
      if (!username) {
        router.push("/signin");
        return;
      }
      try {
        const response = await fetch(
          `/api/fetchPassword?username=${username}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPasswords(data.password);
        } else {
          setPasswords([]);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    fetchPassword();
  }, [user, router]);

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
