import { Meteor } from "meteor/meteor";
import React from "react";

import { useNavigate, useParams } from "react-router";
import { RoutesEnum } from "../constants/RoutesEnum";

export const CampaignVerification = () => {
  const { hash } = useParams();
  const navigate = useNavigate();

  Meteor.call(
    "campaign-verification",
    hash,
    (err: Meteor.Error, res: { targetUrl: string }) => {
      if (err) {
        navigate(RoutesEnum.NOTFOUND);
        return;
      }

      if (res) {
        window.location.href = res.targetUrl;
      }
    }
  );

  return <></>;
};
