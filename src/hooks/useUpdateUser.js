import { useState } from "react";
import useAuthUserStore from "./../store/userAuth";
import { storage, db } from "./../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const useUpdateUser = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const updatedUserToStore = useAuthUserStore((state) => state.setUser);
  const userNow = useAuthUserStore((state) => state.user);
  const updateUser = async (selectedItem, inputs) => {
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePic/${userNow.uid}`);
    const userDocRef = doc(db, "users", userNow.uid);

    let URL;
    try {
      if (selectedItem) {
        await uploadString(storageRef, selectedItem, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePic/${userNow.uid}`));
      }
      const newDoc = {
        ...userNow,
        username: inputs.username || userNow.username,
        bio: inputs.bio || userNow.bio,
        profilePicUrl: URL || userNow.profilePicUrl,
      };
      await updateDoc(userDocRef, newDoc);
      updatedUserToStore(newDoc);

      localStorage.setItem("user", JSON.stringify(newDoc));
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };
  return { updateUser, isUpdating };
};

export default useUpdateUser;
