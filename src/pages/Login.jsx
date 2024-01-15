import { Box, Flex } from "@chakra-ui/react";
import GoogleAuth from "../components/Google/GoogleAuth";

const Login = () => {
  return (
    <Box
      minW="70%"
      px={10}
      py={4}
      bg="blue.300"
      rounded="lg"
      position={"relative"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box fontSize={"2rem"} fontWeight={"bold"}>
          Welcome👋
        </Box>
        <GoogleAuth />
      </Flex>
    </Box>
  );
};

export default Login;
