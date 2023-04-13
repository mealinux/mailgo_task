import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RenderRoutes } from "../routes/Routes";

import { ColorsEnum } from "./constants/ColorsEnum";

export const App = () => {
  const theme = extendTheme({
    styles: {
      global: () => ({
        body: {
          bg: ColorsEnum.WHITE,
          fontFamily: "Inter, sans-serif",
        },
        heading: {
          fontFamily: "Inter, sans-serif",
        },
      }),
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <RenderRoutes />
    </ChakraProvider>
  );
};
