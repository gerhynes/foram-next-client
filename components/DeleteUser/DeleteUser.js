import { useState } from "react";
import DeleteUserForm from "../DeleteUserForm/DeleteUserForm";

function DeleteUser({ userToDelete }) {
  const [isDeleteUserFormOpen, setIsDeleteUserFormOpen] = useState(false);

  const openDeleteUserForm = () => setIsDeleteUserFormOpen(true);
  const closeDeleteUserForm = () => setIsDeleteUserFormOpen(false);

  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center mt-8 mb-8 rounded p-4 border-2">
          <h3 className="text-2xl font-semibold">Danger Zone</h3>
          <button
            className="inline-flex items-center px-2 py-2 text-red-600 border-4 border-red-600 hover:bg-red-600  hover:text-white transition"
            onClick={openDeleteUserForm}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">Delete Account</span>
          </button>
        </div>
        <DeleteUserForm
          userToDelete={userToDelete}
          isDeleteUserFormOpen={isDeleteUserFormOpen}
          closeDeleteUserForm={closeDeleteUserForm}
        />
      </div>
    </>
  );
}
export default DeleteUser;
