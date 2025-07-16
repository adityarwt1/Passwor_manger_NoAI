"use client";
import { CopyCheckIcon, CopyIcon, EyeIcon, EyeOffIcon } from "lucide-react";
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
    plateform: "",
    username: "",
    password: "",
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

  return (
    <div className="bg-zinc-100 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg dark:bg-zinc-800 dark:text-white">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <input
            className={`text-xl font-semibold text-zinc-800 dark:text-zinc-100 rounded px-1 ${
              editcontent ? "border" : ""
            }`}
            disabled={!editcontent}
            defaultValue={
              password.plateform.length < 10
                ? password.plateform
                : `${password.plateform.slice(0, 7)}...` || "Unknown Platform"
            }
            onChange={(e) => {
              setChanges({ ...changes, plateform: e.target.value });
            }}
          />

          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              aria-label="Edit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              aria-label="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <button onClick={handleCopy}>
              {copied ? (
                <CopyCheckIcon className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200" />
              ) : (
                <CopyIcon className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200" />
              )}
            </button>
            <button
              className="ml-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              onClick={toggleShowPassword}
              disabled={editcontent}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Password</p>
            <div className="flex items-center">
              <input
                className={`text-zinc-800 px-1 dark:text-zinc-200 rounded-md w-fit ${
                  editcontent ? "border" : ""
                }`}
                defaultValue={
                  editcontent || showPassword
                    ? changes.password || password.password
                    : "••••••••"
                }
                disabled={!editcontent}
                onChange={(e) =>
                  setChanges({ ...changes, password: e.target.value })
                }
              />

              {editcontent && (
                <div
                  onClick={handleSave}
                  className="bg-green-500 py-1 px-2 rounded-sm ml-1 cursor-pointer"
                >
                  {saving ? "Saving..." : "Save"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
