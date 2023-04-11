import React from "react";

import { useParams } from "react-router";

export const CampaignCallback = () => {
  const { hash } = useParams();
  console.log(2342342);

  console.log(hash);

  return <></>;
};
