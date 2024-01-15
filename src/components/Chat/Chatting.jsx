import {
  VStack,
  Flex,
  Avatar,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Chattings from "./Chattings";
import FooterChatting from "./FooterChatting";
import useGetProfileUser from "./../../hooks/useGetProfileUser";
import useGettingProfile from "./../../store/useGetProfile";
import DrawerProfileUser from "./../Drawer/DrawerProfileUser";

const Chatting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileUser = useGettingProfile((state) => state.profile);
  return (
    <>
      <VStack alignItems="start" position="relative" h="full">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="full"
          pl={4}>
          <Flex gap={5} alignItems="center">
            <Avatar src={profileUser?.profilePicUrl} size="md" />
            <Box fontWeight="bold" fontSize="lg">
              {profileUser?.username}
            </Box>
          </Flex>

          <Button onClick={onOpen}>Check Profile</Button>
        </Flex>
        S
        <Chattings />
        <FooterChatting />
      </VStack>
      {onOpen && <DrawerProfileUser isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default Chatting;
