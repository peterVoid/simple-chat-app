import { Container, Box, Flex } from "@chakra-ui/react";
import UserChat from "../components/Chat/UserChat";
import ChattingUser from "../components/Chat/ChattingUser";
import { useState } from "react";
import useAuthUserStore from "./../store/userAuth";

const Chats = () => {
  const [uiDefault, setUiDefault] = useState(true);
  const userNow = useAuthUserStore((state) => state.user);
  return (
    <Container
      maxW="container.xl"
      px="2"
      py="2"
      position="absolute"
      top="0"
      mt="5%"
      bg="#1d222b"
      rounded="lg"
      h={"calc(100% - 274px)"}>
      <Box maxW="full" h="full">
        <Flex w="full" h="full" justifyContent={"space-between"}>
          <Box flex="1.3">
            {userNow && <UserChat setUiDefault={setUiDefault} />}
          </Box>
          <Box flex="2">
            <ChattingUser uiDefault={uiDefault} />
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default Chats;
