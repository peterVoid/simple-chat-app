import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import useGettingProfile from "./../store/useGetProfile";

const useGetProfileUser = () => {
  const bingung = useGettingProfile((state) => state.setProfile);
  const handleGetProfileUser = async (uid) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        bingung(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  return handleGetProfileUser;
};

export default useGetProfileUser;
