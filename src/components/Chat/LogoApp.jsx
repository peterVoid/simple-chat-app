import { Box, Flex } from "@chakra-ui/react";

const LogoApp = () => {
  return (
    <Box position={"absolute"} w="60%" h="95%">
      <Flex
        w="full"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        gap={4}
        h="full">
        <iframe
          src="https://giphy.com/embed/WirhZMBF1AZVK"
          width="480"
          height="270"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen></iframe>
        <Box fontSize={"1.3rem"} fontWeight={"bold"}>
          WELCOME TO MY APP MY FRIENDS🫰👋
        </Box>
      </Flex>
    </Box>
  );
};

export default LogoApp;
