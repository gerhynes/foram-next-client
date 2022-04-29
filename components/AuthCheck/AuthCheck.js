import { useContext } from "react";
import { useRouter } from "next/router";
import Loading from "../Loading/Loading";
import { UserContext } from "../../contexts/UserContext";

function AuthCheck({ children }) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  if (typeof window !== "undefined" && user.role !== "admin") {
    router.push("/");
  }
  return children;
}
export default AuthCheck;
