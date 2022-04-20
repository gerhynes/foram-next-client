import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext";

function LogoutButton() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setUser("");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-2 text-white bg-indigo-600 border-2 border-indigo-200 hover:bg-indigo-200  hover:text-indigo-900 transition"
    >
      Log out
    </button>
  );
}
export default LogoutButton;
