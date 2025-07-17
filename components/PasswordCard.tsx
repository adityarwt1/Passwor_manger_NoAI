"use client";
import { CopyCheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface Password {
  plateform: string;
  username: string;
  _id: string;
  password: string;
}

interface PasswordCardProps {
  passwordData: Password;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ passwordData }) => {
  const [password, setPassword] = useState(passwordData);
  const [showPassword, setShowPassword] = useState(false);
  const [editcontent, setEditContent] = useState(false);
  const [changes, setChanges] = useState({
    plateform: passwordData.plateform,
    username: passwordData.username,
    password: passwordData.password,
  });
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleEdit = () => {
    // Reset showPassword when entering edit mode
    if (!editcontent) {
      setShowPassword(true);
    }
    setEditContent(!editcontent);
  };

  const handleDelete = async () => {
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
          password: changes.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setPassword(data.update);
      }
    } catch (error) {
      console.log((error as Error).message);
    } finally {
      setEditContent(false);
      setSaving(false);
      setShowPassword(false); // Reset showPassword after saving
    }
  };

  const toggleShowPassword = () => {
    if (!editcontent) {
      setShowPassword((prev) => !prev);
    }
  };

  const handleCopy = async () => {
    setCopied(true);
    try {
      await navigator.clipboard.writeText(password.password);
      setTimeout(() => {
        setCopied(false);
      }, 500);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  // Function to get display value for password field
  const getPasswordDisplayValue = () => {
    if (editcontent) {
      return changes.password;
    }
    return showPassword ? password.password : "••••••••";
  };

  // Function to get display value for platform field
  const getPlatformDisplayValue = () => {
    if (editcontent) {
      return changes.plateform;
    }
    return password.plateform.length > 20
      ? `${password.plateform.slice(0, 20)}...`
      : password.plateform;
  };

  return (
    <Link href={`/password/${passwordData._id}`}>
      <div className="bg-zinc-100 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg dark:bg-zinc-800 dark:text-white w-full max-w-sm mx-auto sm:max-w-none">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-4 gap-2">
            <div className="flex-1 min-w-0">
              <input
                className={`text-lg sm:text-xl font-semibold text-zinc-800 dark:text-zinc-100 rounded px-1 w-full bg-transparent ${
                  editcontent
                    ? "border border-zinc-300 dark:border-zinc-600"
                    : "border-0"
                }`}
                disabled={!editcontent}
                value={getPlatformDisplayValue()}
                onChange={(e) => {
                  setChanges({ ...changes, plateform: e.target.value });
                }}
                placeholder="Platform name"
                title={password.plateform}
                onClick={() => {
                  navigator.clipboard.writeText(password.plateform);
                }}
              />
            </div>

            <div className="flex space-x-1 sm:space-x-2 flex-shrink-0">
              <button
                onClick={handleEdit}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 p-1"
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 p-1"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={handleCopy}
                className="p-1"
                aria-label="Copy password"
              >
                {copied ? (
                  <CopyCheckIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <CopyIcon className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200" />
                )}
              </button>
              <button
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                onClick={toggleShowPassword}
                disabled={editcontent}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                Password
              </p>
              <div className="flex items-center gap-2">
                <input
                  className={`text-zinc-800 px-2 py-1 dark:text-zinc-200 rounded-md flex-1 min-w-0 ${
                    editcontent
                      ? "border border-zinc-300 dark:border-zinc-600"
                      : "bg-transparent border-0"
                  }`}
                  value={getPasswordDisplayValue()}
                  disabled={!editcontent}
                  onChange={(e) =>
                    setChanges({ ...changes, password: e.target.value })
                  }
                  placeholder="Password"
                  type={
                    editcontent ? "text" : showPassword ? "text" : "password"
                  }
                />

                {editcontent && (
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white py-1 px-3 rounded-sm text-sm font-medium transition-colors flex-shrink-0"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PasswordCard;
