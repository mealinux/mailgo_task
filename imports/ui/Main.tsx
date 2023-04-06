import React from "react";

import { Body } from "./layouts/Body";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";
import { Flex } from "@chakra-ui/react";

import "react-calendar/dist/Calendar.css";
import { Accounts } from "meteor/accounts-base";
import { Navigate, useLocation } from "react-router";
import { RoutesEnum } from "./constants/RoutesEnum";

import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";

const Main = (props: any) => {
  const { children, title, ...style } = props;
  const location = useLocation();

  return Accounts.userId() ? (
    <Flex flexDirection={"column"}>
      <Flex>
        <Navbar title={title} />
      </Flex>
      <Flex width={"100%"}>
        <Sidebar />
        <Body {...style}>{children}</Body>
      </Flex>
    </Flex>
  ) : (
    <Navigate to={RoutesEnum.LOGIN} replace state={location} />
  );
};

export default Main;
