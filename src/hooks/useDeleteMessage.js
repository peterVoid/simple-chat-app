import useSendingMessage from "./../store/message";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const useDeleteMessage = () => {
  const isDelete = useSendingMessage((state) => state.deleteMessage);

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Really")) {
      return;
    }
    try {
      await deleteDoc(doc(db, "messages", id));
      isDelete(id);
    } catch (error) {
      console.log(error);
    }
  };
  return handleDeleteMessage;
};

export default useDeleteMessage;
