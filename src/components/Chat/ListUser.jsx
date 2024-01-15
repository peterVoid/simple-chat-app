import { Flex, Avatar, Text, Box } from "@chakra-ui/react";
import useGetProfileUser from "./../../hooks/useGetProfileUser";

const ListUser = ({ data, setUiDefault }) => {
  const handleGetProfileUser = useGetProfileUser();
  return (
    <Box cursor="pointer" onClick={() => handleGetProfileUser(data.uid)}>
      <Flex
        justifyContent={"start"}
        w="full"
        alignItems={"center"}
        rounded="xl"
        px={2}
        py={4}
        _hover={{ bg: "gray.700" }}
        onClick={() => setUiDefault(false)}>
        <Avatar src={data.profilePicUrl} size={"sm"} />
        <Text fontWeight={"bold"} ml={2}>
          {data.username}
        </Text>
      </Flex>
    </Box>
  );
};

export default ListUser;
