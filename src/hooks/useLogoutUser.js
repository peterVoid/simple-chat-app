import { useSignOut } from "react-firebase-hooks/auth";
import useAuthUserStore from "../store/userAuth";
import { useState } from "react";
import { auth } from "../firebase/firebase";

const useLogoutUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthUserStore((state) => state.logout);
  const [signOut, loading, error] = useSignOut(auth);
  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await signOut();
      logout();
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { logoutUser, isLoading };
};

export default useLogoutUser;
