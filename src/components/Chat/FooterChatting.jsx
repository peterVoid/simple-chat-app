import { useState, useRef } from "react";
import {
  Flex,
  Input,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  Avatar,
} from "@chakra-ui/react";
import { AttachmentIcon, ArrowUpIcon } from "@chakra-ui/icons";
import useSendMessage from "./../../hooks/useSendMessage";
import useChangeImage from "./../../hooks/useChangeImage";

const FooterChatting = () => {
  const [value, setValue] = useState("");
  const fileImg = useRef(null);

  const { loadingMessage, handleSendMessage } = useSendMessage();
  const { handleChangeImage, selectedItem, setSelectedItem } = useChangeImage();
  const handleButtonMessage = async () => {
    try {
      await handleSendMessage(value, selectedItem, setSelectedItem);
      setValue("");
      setSelectedItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box w="full" position="absolute" bottom="0">
      {selectedItem && (
        <Flex w="full" justifyContent="center" pb={5}>
          <img src={selectedItem} width="200px" height="100px" />
        </Flex>
      )}

      <Flex py="2" px="4" w="full" alignItems="center">
        <Flex flex="1" mr="2">
          <InputGroup>
            <Input
              value={value}
              placeholder="Type a message..."
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(value);
                }
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => fileImg.current.click()}>
                <AttachmentIcon />
              </Button>
              <Input
                type="file"
                hidden
                ref={fileImg}
                onChange={handleChangeImage}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
        <Button isLoading={loadingMessage} onClick={handleButtonMessage}>
          <ArrowUpIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default FooterChatting;
