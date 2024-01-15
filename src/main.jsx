import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.50", "#000")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles });
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Router>
);
