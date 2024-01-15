import useAuthUserStore from "../store/userAuth";
import useGetUserChat from "./../store/useGetUser";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState, useEffect } from "react";

const useGetUserMessage = () => {
  const [loadingUser, setIsLoading] = useState(false);
  const getUsers = useGetUserChat((state) => state.getUsers);
  const userNow = useAuthUserStore((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    const gettingUsers = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("uid", "!=", userNow.uid)
        );

        const querySnapshot = await getDocs(q);

        const dataDoc = [];
        querySnapshot.forEach((doc) => {
          dataDoc.push(doc.data());
        });
        getUsers(dataDoc);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    gettingUsers();
  }, [getUsers, userNow]);
  return loadingUser;
};

export default useGetUserMessage;
