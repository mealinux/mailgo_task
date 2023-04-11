import React, { useState } from "react";

import { Flex, Text } from "@chakra-ui/react";
import { ColorsEnum } from "../../constants/ColorsEnum";
import { Meteor } from "meteor/meteor";
import { useNavigate, useParams } from "react-router";
import { RoutesEnum } from "../../constants/RoutesEnum";

export const UnsubscribeSuccessView = () => {
  const navigate = useNavigate();
  const { hash } = useParams();
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  Meteor.call("unsubscribed-success", hash, (err: Meteor.Error, res: any) => {
    if (err) {
      navigate(RoutesEnum.NOTFOUND);
      return;
    }

    if (res) {
      setIsUnsubscribed(true);
    }
  });

  return (
    <>
      {isUnsubscribed ? (
        <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
          <Text fontSize={50} color={ColorsEnum.BLUE}>
            Unsubscribed, successfully
          </Text>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};
