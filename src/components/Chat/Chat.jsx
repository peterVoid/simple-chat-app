import { Flex, Box, Avatar } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import useAuthUserStore from "./../../store/userAuth";
import useGettingProfile from "./../../store/useGetProfile";
import useSendingMessage from "./../../store/message";
import { useState } from "react";
import useDeleteMessage from "./../../hooks/useDeleteMessage";

const Chat = ({ item }) => {
  const [statusMessage, setStatusMessage] = useState(false);
  const userNow = useAuthUserStore((state) => state.user);
  const data = useSendingMessage((state) => state.message);
  const handleDeleteMessage = useDeleteMessage();

  const handleDelete = async () => {
    try {
      await handleDeleteMessage(item.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Flex
        maxW="max-content"
        bg={item.createdBy === userNow?.uid ? "blue.500" : "green.500"}
        p={2}
        mt="2"
        rounded="lg"
        flexDir="column"
        ml={item.createdBy === userNow?.uid ? "auto" : "0"}>
        <Flex flexDir="column" maxW="200px">
          <Box>{item?.imgMessage && <img src={item?.imgMessage} />}</Box>
          <Box>{item.text}</Box>
        </Flex>

        <Flex
          alignItems="center"
          w="full"
          gap={4}
          justifyContent="space-between"
          pt={2}>
          <Box ml={2}>{item?.time}</Box>
          {userNow.uid === item.createdBy ? (
            <Box cursor="pointer" onClick={handleDelete}>
              <DeleteIcon />
            </Box>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default Chat;
