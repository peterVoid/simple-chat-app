import { useState } from "react";
import { Box } from "@chakra-ui/react";
import LogoApp from "./LogoApp";
import Chatting from "./Chatting";

const ChattingUser = ({ uiDefault }) => {
  return (
    <>
      {uiDefault && <LogoApp />}
      {!uiDefault && <Chatting />}
    </>
  );
};

export default ChattingUser;
