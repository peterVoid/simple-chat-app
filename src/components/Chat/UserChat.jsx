import {
  VStack,
  Box,
  Input,
  Flex,
  Button,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import ListUser from "./ListUser";
import useLogoutUser from "../../hooks/useLogoutUser";
import useAuthUserStore from "../../store/userAuth";
import useGetUserMessage from "../../hooks/useGetUserMessage";
import useGetUserChat from "../../store/useGetUser";
import { useState } from "react";
import DrawerEditProfile from "./../Drawer/DrawerEditProfile";

const UserChat = ({ setUiDefault }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authUser = useAuthUserStore((state) => state.user);
  const users = useGetUserChat((state) => state.users);

  const loadingUser = useGetUserMessage();
  const { logoutUser, isLoading } = useLogoutUser();

  const handleLogoutUser = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  };
  if (loadingUser) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <VStack gap={2} alignItems={"start"} p={2} position="relative" h="full">
        <Box
          position="absolute"
          right="0"
          w="1px"
          bg="gray.700"
          height="full"
        />
        <Flex
          justifyContent={"space-between"}
          w="full"
          alignItems="center"
          mb={2}>
          <Box fontSize={"2xl"} fontWeight={"bold"}>
            <Avatar src={authUser?.profilePicUrl} />
          </Box>
          <Flex gap={2} alignItems="center">
            <Button onClick={onOpen}>Edit Profile</Button>
            <Button
              colorScheme="red"
              cursor={"pointer"}
              onClick={handleLogoutUser}
              isLoading={isLoading}>
              Logout
            </Button>
          </Flex>
        </Flex>
        <Input rounded={"full"} placeholder="search user..." />
        <Flex flexDir="column" gap={2} w="full" rounded="lg" p={2} mt={14}>
          {loadingUser &&
            users.map((_, i) => (
              <Box
                textAlign={"center"}
                fontFamily={"monospace"}
                fontWeight={"bold"}
                key={i}>
                Loading...
              </Box>
            ))}
          {!loadingUser &&
            users.map((user) => (
              <ListUser
                data={user}
                key={user.uid}
                setUiDefault={setUiDefault}
              />
            ))}
        </Flex>
      </VStack>

      {onOpen && <DrawerEditProfile isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default UserChat;
