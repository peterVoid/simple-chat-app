import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Stack,
  Flex,
  Avatar,
  Button,
  Input,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useChangeImage from "./../../hooks/useChangeImage";
import useAuthUserStore from "./../../store/userAuth";
import useUpdateUser from "./../../hooks/useUpdateUser";

const DrawerEditProfile = ({ isOpen, onClose }) => {
  const firstField = useRef();
  const inputsRef = useRef(null);
  const authUser = useAuthUserStore((state) => state.user);
  const [value, setValue] = useState({
    username: authUser.username,
    bio: authUser.bio,
  });
  const { handleChangeImage, selectedItem } = useChangeImage();
  const { updateUser, isUpdating } = useUpdateUser();
  const handleEdit = async () => {
    try {
      await updateUser(selectedItem, value);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Edit Profile</DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Flex
              w="full"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              gap="4">
              <Avatar src={selectedItem || authUser?.profilePicUrl} size="lg" />
              <Button onClick={() => inputsRef.current.click()}>
                Edit Profile Picture
              </Button>
              <Input
                type="file"
                hidden
                ref={inputsRef}
                onChange={handleChangeImage}
              />
            </Flex>

            <Box>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                ref={firstField}
                placeholder="Please enter user name"
                value={value?.username}
                onChange={(e) =>
                  setValue({ ...value, username: e.target.value })
                }
              />
            </Box>

            <Box>
              <FormLabel htmlFor="username">Bio</FormLabel>
              <Input
                ref={firstField}
                placeholder="Bio"
                value={value?.bio}
                onChange={(e) => setValue({ ...value, bio: e.target.value })}
              />
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isUpdating}
            onClick={handleEdit}>
            Submit
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerEditProfile;
