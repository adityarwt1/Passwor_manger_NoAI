"use client";

import React, { useEffect, useState, useCallback } from "react";
import PasswordCard from "@/components/PasswordCard";
import { Password } from "@/types/Password";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Plus,
  SortAsc,
  SortDesc,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";

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
      setPage(0);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Password Manager
              </h1>
              <p className="text-slate-600">
                Manage and secure all your passwords in one place
              </p>
            </div>

            <Link
              href="/add"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Add Password</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search passwords by platform or username..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-500"
                  autoComplete="off"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(0);
                  }}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSort("plateform")}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    sortBy === "plateform"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <span>Platform</span>
                  {sortBy === "plateform" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="w-4 h-4" />
                    ) : (
                      <SortDesc className="w-4 h-4" />
                    ))}
                </button>

                <button
                  onClick={() => handleSort("createdAt")}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    sortBy === "createdAt"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <span>Date</span>
                  {sortBy === "createdAt" &&
                    (sortOrder === "asc" ? (
                      <SortAsc className="w-4 h-4" />
                    ) : (
                      <SortDesc className="w-4 h-4" />
                    ))}
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          {pagination && (
            <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-600">
              Showing {pagination.currentPage * pagination.limit + 1} to{" "}
              {Math.min(
                (pagination.currentPage + 1) * pagination.limit,
                pagination.totalCount
              )}{" "}
              of {pagination.totalCount} passwords
              {query && ` matching "${query}"`}
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && page === 0 ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-slate-600">Loading passwords...</p>
            </div>
          </div>
        ) : passwords.length > 0 ? (
          <>
            {/* Password List */}
            <div className="space-y-4 mb-8">
              {passwords.map((password) => (
                <PasswordCard
                  key={password._id?.toString()}
                  passwordData={password}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Page Info */}
                  <div className="text-sm text-slate-600">
                    Page {pagination.currentPage + 1} of {pagination.totalPages}
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => goToPage(0)}
                      disabled={!pagination.hasPreviousPage}
                      className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="First page"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => goToPage(page - 1)}
                      disabled={!pagination.hasPreviousPage}
                      className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {generatePageNumbers().map((pageNum, index) => (
                        <React.Fragment key={index}>
                          {pageNum === "..." ? (
                            <span className="px-2 py-1 text-slate-500">
                              ...
                            </span>
                          ) : (
                            <button
                              onClick={() => goToPage(pageNum as number)}
                              className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                                pageNum === pagination.currentPage
                                  ? "bg-slate-900 text-white"
                                  : "text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              {(pageNum as number) + 1}
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <button
                      onClick={() => goToPage(page + 1)}
                      disabled={!pagination.hasNextPage}
                      className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        goToPage((pagination?.totalPages || 1) - 1)
                      }
                      disabled={!pagination.hasNextPage}
                      className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      title="Last page"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex items-center justify-center py-16">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {query ? (
                  <Search className="w-8 h-8 text-slate-400" />
                ) : (
                  <List className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {query ? "No passwords found" : "No passwords yet"}
              </h3>
              <p className="text-slate-600 mb-6">
                {query
                  ? `No passwords match "${query}". Try adjusting your search.`
                  : "Start by adding your first password to get started."}
              </p>
              {query ? (
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  href="/add"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Password</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {loading && page > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
