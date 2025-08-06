"use client";

import {
  Copy,
  CopyCheck,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  ExternalLink,
  Save,
  X,
  Globe,
  User,
  Key,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface Password {
  plateform: string;
  username: string;
  _id: string;
  password: string;
  createdAt?: string;
}

interface PasswordCardProps {
  passwordData: Password;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ passwordData }) => {
  const [password, setPassword] = useState(passwordData);
  const [showPassword, setShowPassword] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [changes, setChanges] = useState({
    plateform: passwordData.plateform,
    username: passwordData.username,
    password: passwordData.password,
  });
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEdit = () => {
    if (!editContent) {
      setShowPassword(true);
      setChanges({
        plateform: password.plateform,
        username: password.username,
        password: password.password,
      });
    }
    setEditContent(!editContent);
  };

  const handleCancel = () => {
    setChanges({
      plateform: password.plateform,
      username: password.username,
      password: password.password,
    });
    setEditContent(false);
    setShowPassword(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this password?")) return;

    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: password._id }),
      });
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: password._id,
          plateform: changes.plateform,
          username: changes.username,
          password: changes.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setPassword(data.update);
        setEditContent(false);
        setShowPassword(false);
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = async () => {
    setCopied(true);
    try {
      await navigator.clipboard.writeText(password.password);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              {editContent ? (
                <input
                  type="text"
                  value={changes.plateform}
                  onChange={(e) =>
                    setChanges({ ...changes, plateform: e.target.value })
                  }
                  className="text-lg font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1 w-full focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Platform name"
                />
              ) : (
                <h3
                  className="text-lg font-semibold text-slate-900 truncate"
                  title={password.plateform}
                >
                  {password.plateform}
                </h3>
              )}
              <p className="text-sm text-slate-500 flex items-center mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                Added {formatDate(password.createdAt)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {editContent ? (
              <>
                <button
                  onClick={handleCancel}
                  className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{saving ? "Saving..." : "Save"}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  title="Edit"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Link
                  href={`/password/${password._id}`}
                  className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  title="View Details"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Username/Email
            </label>
            {editContent ? (
              <input
                type="text"
                value={changes.username}
                onChange={(e) =>
                  setChanges({ ...changes, username: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900"
                placeholder="Username or email"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-slate-900 font-mono text-sm bg-slate-50 px-3 py-2 rounded-lg flex-1 truncate">
                  {password.username}
                </span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(password.username)
                  }
                  className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                  title="Copy username"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Password
            </label>
            <div className="flex items-center space-x-2">
              {editContent ? (
                <input
                  type="text"
                  value={changes.password}
                  onChange={(e) =>
                    setChanges({ ...changes, password: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900"
                  placeholder="Password"
                />
              ) : (
                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-slate-900 font-mono text-sm bg-slate-50 px-3 py-2 rounded-lg flex-1">
                    {showPassword ? password.password : "••••••••••••"}
                  </span>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}
              <button
                onClick={handleCopy}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                title="Copy password"
              >
                {copied ? (
                  <CopyCheck className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
