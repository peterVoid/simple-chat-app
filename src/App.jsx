import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import { auth } from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuthUserStore from "./store/userAuth";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading && !user) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Flex h="100vh" justifyContent="center" alignItems="center" w="full">
      <Routes>
        <Route path="/" element={user ? <Chats /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </Flex>
  );
};

export default App;
