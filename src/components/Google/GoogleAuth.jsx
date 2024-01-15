import { Box, Button } from "@chakra-ui/react";
import useLoginWithGoogle from "../../hooks/useSignInWithGoogle";

const GoogleAuth = () => {
  const handleLoginWithGoogle = useLoginWithGoogle();
  return (
    <Box ml="4">
      <Button
        bg="blue.500"
        _hover={{ bg: "blue.600" }}
        onClick={handleLoginWithGoogle}>
        Login With Google
      </Button>
    </Box>
  );
};

export default GoogleAuth;
