import React from "react";

export const Body = (props: any) => {
  const { children, ...style } = props;

  return <div {...style}>{children}</div>;
};
