import { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

function DeleteUserForm({
  userToDelete,
  isDeleteUserFormOpen,
  closeDeleteUserForm
}) {
  // Router for redirecting on completion
  const router = useRouter();

  // Logged-in user
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");

  const deleteUser = (userId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, config)
      .then((response) => {
        if (response.message) {
          console.log(response.message);
          toast.error(
            `An error occurred (${response.message}). Please try again shortly`
          );
          return;
        }
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again shortly");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === userToDelete.username) {
      deleteUser(userToDelete.id);
    } else {
      toast.error("Usernames do not match");
    }
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 w-full ${
        isDeleteUserFormOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-red-100 p-4 rounded">
        <form className="text-center" onSubmit={handleSubmit}>
          <h2 className="text-xl mb-2 font-semibold">Delete User Account</h2>
          <p className="text-slate-500 mb-4">
            This action cannot be{" "}
            <strong className="text-slate-600">undone</strong>
          </p>
          <div className="mb-4">
            <input
              className="p-2 rounded mb-4"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value.replaceAll(" ", ""))}
              value={username}
              required
            />
            <p className="text-slate-500">
              Enter this account&apos;s username to confirm that you wish to
              delete this account
            </p>
          </div>
          <div className="flex gap-12 justify-center">
            <button
              className="text-slate-500 font-semibold hover:text-slate-600"
              onClick={closeDeleteUserForm}
            >
              cancel
            </button>
            <button className="inline-flex items-center px-2 py-2 text-white border-4 border-red-600 bg-red-600  hover:bg-red-900 hover:border-red-900  transition">
              <span className="ml-2">Delete Account</span>
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
export default DeleteUserForm;
