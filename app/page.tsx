"use client";
import React, { useEffect, useState, useCallback } from "react";
import PasswordCard from "@/components/PasswordCard";
import { Password } from "@/types/Password";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const HomePage: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const clearSearch = () => setQuery("");

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch passwords when debouncedQuery or user changes
  useEffect(() => {
    const fetchPassword = async () => {
      const username = user?.username;
      if (!username) {
        router.push("/signin");
        return;
      }
      setLoading(true);
      let url = `/api/fetchPassword?username=${username}`;
      if (debouncedQuery) {
        url += `&q=${encodeURIComponent(debouncedQuery)}`;
      }
      try {
        const response = await fetch(url, { method: "POST" });
        const data = await response.json();
        if (response.ok) {
          setPasswords(data.password);
        } else {
          setPasswords([]);
        }
      } catch (error) {
        setPasswords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPassword();
  }, [debouncedQuery, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-zinc-600 dark:text-zinc-400">
            Loading passwords...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search passwords..."
        className="mb-6 px-4 py-2 border rounded w-full max-w-md"
      />
      {passwords.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {passwords.map((password) => (
            <PasswordCard
              key={password._id?.toString()}
              passwordData={password}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center p-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md">
            <div className="text-4xl mb-4">{query ? "🔍" : "🔒"}</div>
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
              {query ? "No passwords found" : "No passwords found"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              {query
                ? `No passwords match "${query}". Try a different search term.`
                : "Start by adding your first password to get started."}
            </p>
            {query && (
              <button
                onClick={clearSearch}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
