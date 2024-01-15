import { useState } from "react";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import useAuthUserStore from "./../store/userAuth";
import useGettingProfile from "./../store/useGetProfile";
import useSendingMessage from "./../store/message";
import { db, storage } from "../firebase/firebase";
import { uploadString, getDownloadURL, ref } from "firebase/storage";

const useSendMessage = () => {
  const [loadingMessage, setloading] = useState(false);
  const sendMessages = useSendingMessage((state) => state.sendMessage);
  const userNow = useAuthUserStore((state) => state.user);
  const targetUserChat = useGettingProfile((state) => state.profile);
  const time = new Date();
  const handleSendMessage = async (input, selectedItem, setSelectedItem) => {
    if (!selectedItem) {
      setSelectedItem(null);
    }
    setloading(true);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const times = hours + ":" + minutes;
    const dataMessage = {
      text: input,
      createdAt: Date.now(),
      to: targetUserChat?.uid,
      createdBy: userNow?.uid,
      time: times,
    };
    try {
      const docRef = await addDoc(collection(db, "messages"), dataMessage);
      const imageRef = ref(storage, `imgMessage/${docRef.id}`);
      if (selectedItem) {
        await uploadString(imageRef, selectedItem, "data_url");
        const url = await getDownloadURL(imageRef);
        await updateDoc(docRef, { imgMessage: url });
        dataMessage.imgMessage = url;
      }

      sendMessages({ ...dataMessage, id: docRef.id });
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return { loadingMessage, handleSendMessage };
};

export default useSendMessage;
