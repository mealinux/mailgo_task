import React from "react";
import Main from "../Main";
import {
  Card,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { FaRegEnvelope, FaTable, FaUsers, FaUsersSlash } from "react-icons/fa";

import { ColorsEnum } from "../constants/ColorsEnum";

const DashboardView = () => {
  return (
    <Main style={{ width: "80%" }}>
      <Flex padding={5} gap={5} alignItems={"center"} justifyContent={"start"}>
        <Flex justifyContent={"space-evenly"} alignItems={"center"} gap={5}>
          <Card minW={200}>
            <CardBody>
              <Flex alignItems={"center"} gap={4}>
                <FaUsers style={{ color: ColorsEnum.ORANGE }} />
                <Stat>
                  <StatLabel>Total Subscribers</StatLabel>
                  <StatNumber>248</StatNumber>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minW={200}>
            <CardBody>
              <Flex alignItems={"center"} gap={4}>
                <FaUsersSlash style={{ color: ColorsEnum.DARKEST_PURPLE }} />
                <Stat>
                  <StatLabel>Total Unsubscribers</StatLabel>
                  <StatNumber>44</StatNumber>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
        <Flex justifyContent={"space-evenly"} alignItems={"center"} gap={5}>
          <Card minW={200}>
            <CardBody>
              <Flex alignItems={"center"} gap={4}>
                <FaRegEnvelope style={{ color: ColorsEnum.BLUE }} />
                <Stat>
                  <StatLabel>Total Click Campaign</StatLabel>
                  <StatNumber>248</StatNumber>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minW={200}>
            <CardBody>
              <Flex alignItems={"center"} gap={4}>
                <FaTable style={{ color: ColorsEnum.RED }} />
                <Stat>
                  <StatLabel>Total Sent Mail</StatLabel>
                  <StatNumber>248</StatNumber>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </Main>
  );
};

export default DashboardView;
