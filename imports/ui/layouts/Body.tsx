import React, { ReactElement } from "react";

export const Body = (props: { children?: ReactElement; style?: any }) => {
  const { children, ...style } = props;

  return <div {...style}>{children}</div>;
};
