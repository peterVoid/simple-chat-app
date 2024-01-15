import { Container, Box, Flex } from "@chakra-ui/react";
import useAuthUserStore from "./../../store/userAuth";
import Chat from "./Chat";
import useRenderChat from "./../../hooks/useRenderChat";
import useSendingMessage from "./../../store/message";

const Chattings = () => {
  const userNow = useAuthUserStore((state) => state.user);
  const { isLoading } = useRenderChat();
  const akjsd = useSendingMessage((state) => state.message);

  return (
    <>
      {isLoading && <Box>Loading</Box>}
      {akjsd.length === 0 && (
        <Flex w="full" flexDir="column" mt={"10%"} alignItems="center" h="full">
          <iframe
            src="https://giphy.com/embed/QUmpqPoJ886Iw"
            width="480"
            height="332"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen></iframe>
          <Box fontSize={"2rem"} fontWeight={"bold"}>
            No Chats👎😁
          </Box>
        </Flex>
      )}
      {!isLoading && akjsd.length > 0 && (
        <Container
          maxW="container.xl"
          h="85%"
          bg="gray.700"
          py={2}
          overflow="auto">
          {akjsd.map((item) => (
            <Chat key={item.id} item={item} />
          ))}
        </Container>
      )}
    </>
  );
};

export default Chattings;
