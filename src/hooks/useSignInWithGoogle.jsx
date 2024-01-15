import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useAuthUserStore from "../store/userAuth";

const useLoginWithGoogle = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const loginStore = useAuthUserStore((state) => state.login);
  const handleLoginWithGoogle = async () => {
    try {
      const newUserLogin = await signInWithGoogle();

      const docRef = doc(db, "users", newUserLogin.user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.empty) {
        loginStore(docSnap.data());
        localStorage.setItem("user", JSON.stringify(docSnap.data()));
      } else {
        const dataPerson = {
          username: newUserLogin?.user.displayName,
          chats: [],
          createdAt: new Date().toLocaleDateString(),
          uid: newUserLogin?.user.uid,
          profilePicUrl: newUserLogin?.user.photoURL,
          bio: "",
        };
        loginStore(dataPerson);
        localStorage.setItem("user", JSON.stringify(dataPerson));
        await setDoc(doc(db, "users", newUserLogin.user.uid), dataPerson);
        alert("Login Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return handleLoginWithGoogle;
};

export default useLoginWithGoogle;
