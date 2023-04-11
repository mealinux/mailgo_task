import { Meteor } from "meteor/meteor";
import React from "react";

import { useNavigate, useParams } from "react-router";
import { RoutesEnum } from "../constants/RoutesEnum";

export const UnsubscribeVerification = () => {
  const { hash } = useParams();
  const navigate = useNavigate();

  Meteor.call(
    "unsubscribe-verification",
    hash,
    (err: Meteor.Error, res: { hash: string }) => {
      if (err) {
        navigate(RoutesEnum.NOTFOUND);
        return;
      }

      if (res) {
        navigate(RoutesEnum.UNSUBSCRIBED_SUCCESS + "/" + res.hash);
      }
    }
  );

  return <></>;
};
