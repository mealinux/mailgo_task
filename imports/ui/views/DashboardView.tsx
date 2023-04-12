import React, { useEffect, useState } from "react";
import Main from "../Main";
import {
  Card,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import {
  FaFilter,
  FaRegEnvelope,
  FaTable,
  FaTimes,
  FaUsers,
  FaUsersSlash,
} from "react-icons/fa";

import { ColorsEnum } from "../constants/ColorsEnum";
import { Meteor } from "meteor/meteor";
import DateTimeRangePicker from "@wojtekmaj/react-daterange-picker";
import OutlineButtonCom from "../components/OutlineButtonCom";

const DashboardView = (props: { title: string }) => {
  const [filterDateRange, setFilterDateRange] = useState<Array<Date>>([]);

  const [showFilter, setShowFilter] = useState(false);

  const [totalSubscribers, setTotalSubscribers] = useState<Number>(0);
  const [totalUnsubscribers, setTotalUnsubscribers] = useState<Number>(0);
  const [totalClickedCampaign, setTotalClickedCampaign] = useState<Number>(0);
  const [totalSentMail, setTotalSentMail] = useState<Number>(0);

  const fetchStatistics = () => {
    Meteor.call(
      "statistics",
      filterDateRange,
      (
        err: Meteor.Error,
        res: {
          totalSubscribers: Number;
          totalUnsubscribers: Number;
          totalSentMail: Number;
          totalClickedCampaign: Number;
        }
      ) => {
        if (err) {
          console.log(err);
        }

        if (res) {
          setTotalSubscribers(res.totalSubscribers);
          setTotalUnsubscribers(res.totalUnsubscribers);
          setTotalClickedCampaign(res.totalClickedCampaign);
          setTotalSentMail(res.totalSentMail);
        }
      }
    );
  };

  useEffect(() => {
    fetchStatistics();
  }, [filterDateRange]);

  return (
    <Main style={{ width: "80%" }} title={props.title}>
      <Flex
        padding={5}
        gap={5}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {showFilter ? (
          <DateTimeRangePicker
            value={filterDateRange}
            clearIcon={null}
            format={"dd/MM/y"}
            onChange={(date: any) => {
              setFilterDateRange(date);
            }}
          />
        ) : (
          <div></div>
        )}
        <OutlineButtonCom
          text={"Filter"}
          icon={<FaFilter />}
          customClickColor={ColorsEnum.LIGHTEST_PURPLE}
          customContentColor={showFilter ? ColorsEnum.BLACK : ColorsEnum.GREY}
          onClick={() => {
            if (showFilter) {
              setShowFilter(false);
              setFilterDateRange([]);
              fetchStatistics();
            } else {
              setShowFilter(true);
            }
          }}
        />
      </Flex>
      <Flex padding={5} gap={5} alignItems={"center"} justifyContent={"start"}>
        <Flex justifyContent={"space-evenly"} alignItems={"center"} gap={5}>
          <Card minW={200}>
            <CardBody>
              <Flex alignItems={"center"} gap={4}>
                <FaUsers style={{ color: ColorsEnum.ORANGE }} />
                <Stat>
                  <StatLabel>Total Subscribers</StatLabel>
                  <StatNumber>{totalSubscribers.toString()}</StatNumber>
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
                  <StatNumber>{totalUnsubscribers.toString()}</StatNumber>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        </Flex>
        <Flex justifyContent={"space-evenly"} alignItems={"center"} gap={5}>
          <Card minW={200}>
            <CardBody>
              <Flex alignItems={"center"} gap={4}>
                <FaTable style={{ color: ColorsEnum.RED }} />

                <Stat>
                  <StatLabel>Total Click Campaign</StatLabel>
                  <StatNumber>{totalClickedCampaign.toString()}</StatNumber>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
          <Card minW={200}>
            <CardBody>
              <Flex alignItems={"center"} gap={4}>
                <FaRegEnvelope style={{ color: ColorsEnum.BLUE }} />
                <Stat>
                  <StatLabel>Total Sent Mail</StatLabel>
                  <StatNumber>{totalSentMail.toString()}</StatNumber>
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
