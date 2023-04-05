import React, { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RenderRoutes } from "../routes/Routes";

import "@fontsource/inter";

import { ColorsEnum } from "./constants/ColorsEnum";
import UtilContext from "../context/UtilContext";
import UtilModel from "../models/system/UtilModel";

/* const contentCenter = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}; */

export const App = () => {
  const [progressBar, setProgressBar] = useState<any>({} as UtilModel);

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
    <UtilContext.Provider value={{ progressBar, setProgressBar }}>
      <ChakraProvider theme={theme}>
        <RenderRoutes />
      </ChakraProvider>
    </UtilContext.Provider>
  );
};
