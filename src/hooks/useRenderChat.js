import { useEffect, useState } from "react";
import useSendingMessage from "./../store/message";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useGettingProfile from "./../store/useGetProfile";
import useAuthUserStore from "./../store/userAuth";

const useRenderChat = async () => {
  const [isLoading, setLoading] = useState(false);
  const messageNow = useSendingMessage((state) => state.getMessage);
  const msg = useSendingMessage((state) => state.message);
  const profileUserTarget = useGettingProfile((state) => state.profile);
  const userNow = useAuthUserStore((state) => state.user);
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleRender = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "messages"),
          where("createdBy", "in", [userNow?.uid, profileUserTarget?.uid]),
          where("to", "in", [userNow?.uid, profileUserTarget?.uid])
        );

        const querySnapshot = await getDocs(q);
        const vel = [];
        querySnapshot.forEach((doc) => {
          vel.push({ ...doc.data(), id: doc.id });
        });
        vel.sort((a, b) => a.createdAt - b.createdAt);
        messageNow(vel);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!isLoading) {
      handleRender();
    }
  }, [messageNow, profileUserTarget, userNow]);

  return { isLoading };
};

export default useRenderChat;
