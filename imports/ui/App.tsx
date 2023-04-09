import React, { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RenderRoutes } from "../routes/Routes";

import "@fontsource/inter";

import { ColorsEnum } from "./constants/ColorsEnum";
import { ModalProvider } from "../context/UtilContext";

/* const contentCenter = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}; */

export const App = () => {
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: ColorsEnum.WHITE,
          fontFamily: "Inter, sans-serif",
          //...centerStyle,
        },
        heading: {
          fontFamily: "Inter, sans-serif",
        },
      }),
    },
  });

  return (
    <ModalProvider>
      <ChakraProvider theme={theme}>
        <RenderRoutes />
      </ChakraProvider>
    </ModalProvider>
  );
};
