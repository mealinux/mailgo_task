import React from "react";

import { Body } from "./layouts/Body";
import Navbar from "./layouts/Navbar";
import Sidebar from "./layouts/Sidebar";

const Main = (props: any) => {
  const { children, ...style } = props;

  return (
    <>
      <Navbar />
      <Sidebar />
      <Body {...style}>{children}</Body>
    </>
  );
};

export default Main;
