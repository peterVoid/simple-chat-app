import useGettingProfile from "./../../store/useGetProfile";
import useSendingMessage from "./../../store/message";
import { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Highlight,
  Box,
  VStack,
  Avatar,
  Text,
  Flex,
} from "@chakra-ui/react";

const DrawerProfileUser = ({ isOpen, onClose }) => {
  const [imgMsg, setImgMessage] = useState([]);
  const targetProfile = useGettingProfile((state) => state.profile);
  const msg = useSendingMessage((state) => state.message);
  const d = msg.filter((x) => {
    if (x.imgMessage) {
      return x;
    }
  });
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size={{ base: "sm", md: "md" }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Highlight
              query="Info"
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "red.100",
                fontWeight: "bold",
              }}>
              Profile Info
            </Highlight>
          </DrawerHeader>
          <DrawerBody>
            <VStack gap={2} w="full">
              <VStack
                w="full"
                gap={2}
                justifyContent="center"
                alignItems="center"
                bg="gray.900"
                p={4}>
                <Avatar
                  src={targetProfile?.profilePicUrl}
                  size={{ base: "md", md: "lg" }}
                />
                <Text fontWeight="bold" fontSize="1.5rem">
                  {targetProfile?.username}
                </Text>
              </VStack>

              <Flex
                w="full"
                justifyContent="start"
                alignItems="center"
                p={4}
                bg="gray.900">
                <Box>{targetProfile?.bio || "Hey There"}</Box>
              </Flex>

              <Flex
                flexDir="column"
                gap={2}
                w="full"
                bg="gray.900"
                p={4}
                overflow="auto">
                <Box>Media</Box>

                <Flex gap={2}>
                  {d.map((item) => (
                    <img
                      src={item?.imgMessage}
                      width="20%"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </Flex>
              </Flex>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerProfileUser;
