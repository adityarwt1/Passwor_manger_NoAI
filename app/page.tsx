"use client";
import React, { useEffect, useState, useCallback } from "react";
import PasswordCard from "@/components/PasswordCard";
import { Password } from "@/types/Password";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

const HomePage: React.FC = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("plateform");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user } = useUser();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(0); // Reset to first page when searching
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch passwords function
  const fetchPasswords = useCallback(async () => {
    const username = user?.username;
    if (!username) {
      router.push("/signin");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        username,
        p: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
      });

      if (debouncedQuery) {
        params.append("q", debouncedQuery);
      }

      const response = await fetch(`/api/fetchPassword?${params}`, {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setPasswords(data.passwords || []);
        setPagination(data.pagination);
      } else {
        setError(data.message || "Failed to fetch passwords");
        setPasswords([]);
      }
    } catch (error) {
      setError("Network error occurred");
      setPasswords([]);
    } finally {
      setLoading(false);
    }
  }, [user, page, limit, debouncedQuery, sortBy, sortOrder, router]);

  // Fetch passwords when dependencies change
  useEffect(() => {
    fetchPasswords();
  }, [fetchPasswords]);

  // Pagination handlers
  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < (pagination?.totalPages || 0)) {
      setPage(newPage);
    }
  };

  const goToFirstPage = () => goToPage(0);
  const goToLastPage = () => goToPage((pagination?.totalPages || 1) - 1);
  const goToPreviousPage = () => goToPage(page - 1);
  const goToNextPage = () => goToPage(page + 1);

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!pagination) return [];

    const { currentPage, totalPages } = pagination;
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(0, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (range[0] > 0) {
      rangeWithDots.push(0);
      if (range[0] > 1) rangeWithDots.push("...");
    }

    rangeWithDots.push(...range);

    if (range[range.length - 1] < totalPages - 1) {
      if (range[range.length - 1] < totalPages - 2) rangeWithDots.push("...");
      rangeWithDots.push(totalPages - 1);
    }

    return rangeWithDots;
  };

  // Sort handler
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(0);
  };

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setPage(0);
  };

  // Loading state
  if (loading && page === 0) {
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
      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search passwords..."
              className="w-full px-4 py-2 border text-white border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-800"
              autoComplete="off"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600"
                type="button"
                tabIndex={-1}
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(0);
              }}
              className="px-3 py-2 border text-white border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleSort("plateform")}
            className={`px-3 py-1 rounded-lg border text-sm text-white ${
              sortBy === "plateform"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            }`}
          >
            Platform{" "}
            {sortBy === "plateform" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => handleSort("createdAt")}
            className={`px-3 py-1 rounded-lg border text-sm text-white ${
              sortBy === "createdAt"
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
            }`}
          >
            Created{" "}
            {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          {error}
        </div>
      )}

      {/* Results Info */}
      {pagination && (
        <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Showing {pagination.currentPage * pagination.limit + 1} to{" "}
          {Math.min(
            (pagination.currentPage + 1) * pagination.limit,
            pagination.totalCount
          )}{" "}
          of {pagination.totalCount} passwords
          {query && ` for "${query}"`}
        </div>
      )}

      {/* Password Grid */}
      {passwords.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
            {passwords.map((password) => (
              <PasswordCard
                key={password._id?.toString()}
                passwordData={password}
              />
            ))}
          </div>

          {/* Advanced Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex flex-col items-center space-y-4">
              {/* Main Pagination Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToFirstPage}
                  disabled={!pagination.hasPreviousPage}
                  className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  First
                </button>

                <button
                  onClick={goToPreviousPage}
                  disabled={!pagination.hasPreviousPage}
                  className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {generatePageNumbers().map((pageNum, index) => (
                    <React.Fragment key={index}>
                      {pageNum === "..." ? (
                        <span className="px-2 py-1 text-zinc-500">...</span>
                      ) : (
                        <button
                          onClick={() => goToPage(pageNum as number)}
                          className={`px-3 py-2 text-sm rounded-lg border ${
                            pageNum === pagination.currentPage
                              ? "bg-blue-500 text-white border-blue-500"
                              : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          }`}
                        >
                          {(pageNum as number) + 1}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Next
                </button>

                <button
                  onClick={goToLastPage}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Last
                </button>
              </div>

              {/* Jump to Page */}
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Jump to page:
                </span>
                <input
                  type="number"
                  min="1"
                  max={pagination.totalPages}
                  placeholder={(pagination.currentPage + 1).toString()}
                  className="w-16 px-2 py-1 text-white border border-zinc-300 dark:border-zinc-700 rounded text-center bg-white dark:bg-zinc-800"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const targetPage = parseInt(e.currentTarget.value) - 1;
                      if (
                        targetPage >= 0 &&
                        targetPage < pagination.totalPages
                      ) {
                        goToPage(targetPage);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
                <span className="text-zinc-600 dark:text-zinc-400">
                  of {pagination.totalPages}
                </span>
              </div>
            </div>
          )}
        </>
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

      {/* Loading overlay for page changes */}
      {loading && page > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
