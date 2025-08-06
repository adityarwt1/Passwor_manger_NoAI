import Add from "@/components/add";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Shield, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddPasswordPage = async () => {
  const authUser = await auth();
  const user = await currentUser();

  // Redirect if not authenticated
  if (!authUser?.userId) {
    redirect("/sign-in");
  }

  const username = user?.username || user?.firstName || "User";
  const userId = authUser.userId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-6">
            <Link
              href="/"
              className="flex items-center space-x-1 hover:text-slate-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Add Password</span>
          </div>

          {/* Page Title Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-slate-900/20 to-transparent rounded-2xl blur opacity-60" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Add New Password
                </h1>
                <p className="text-slate-600 text-lg max-w-2xl">
                  Securely store a new password entry for{" "}
                  <span className="font-semibold text-slate-800">
                    {username}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Stats or Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-slate-500">Secure Storage</div>
                <div className="flex items-center space-x-1 text-slate-700">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="font-medium">256-bit Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Your data is encrypted and secure
                </h3>
                <p className="text-blue-700 text-sm">
                  All passwords are encrypted using industry-standard AES-256
                  encryption before being stored. Only you can access your data.
                </p>
              </div>
            </div>
          </div>

          {/* Add Component Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <div className="p-8">
              <Add userId={userId} username={username} />
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200/60">
              <h3 className="font-semibold text-slate-900 mb-3">
                Password Security Tips
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Use unique passwords for each account</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Include uppercase, lowercase, numbers, and symbols
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                  <span>Aim for at least 12 characters in length</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200/60">
              <h3 className="font-semibold text-slate-900 mb-3">Need Help?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Having trouble adding a password? Check out our help resources.
              </p>
              <Link
                href="/help"
                className="inline-flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors duration-200"
              >
                <span>Visit Help Center</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPasswordPage;
