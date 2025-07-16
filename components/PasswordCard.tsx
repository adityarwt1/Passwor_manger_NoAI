import React from "react";
// Import your Password model type

interface Password {
  plateform: string;
  username: string;
  _id: string;
  password: string;
}
interface PasswordCardProps {
  passwordData: Password;
  onEdit?: (data: Password) => void;
  onDelete?: (id: string) => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({ passwordData }) => {
  const handleEdit = (data: Password) => {
    console.log("Edit:", data);
    // Implement edit logic
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
    // Implement delete logic
  };

  return (
    <div className="bg-zinc-100 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg dark:bg-zinc-800 dark:text-white">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
            {passwordData.plateform || "Unknown Platform"}
          </h3>
          <div className="flex space-x-2">
            {handleEdit && (
              <button
                onClick={() => handleEdit(passwordData)}
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
            )}
            {handleDelete && (
              <button
                onClick={() =>
                  passwordData._id && handleDelete(passwordData._id.toString())
                }
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
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Username</p>
            <p className="text-zinc-800 dark:text-zinc-200">
              {passwordData.username || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Password</p>
            <div className="flex items-center">
              <p className="text-zinc-800 dark:text-zinc-200">••••••••</p>
              <button
                className="ml-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                onClick={() => {
                  // Implement reveal password logic here
                  alert(`Password: ${passwordData.password}`);
                }}
              >
                Show
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCard;
