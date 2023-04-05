import React, { useState } from "react";
import Main from "../../Main";
import { Flex, useDisclosure } from "@chakra-ui/react";
import DataTableCom from "../../components/DataTableCom";

import { FaPlus, FaUndoAlt } from "react-icons/fa";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import AddSubscriberView from "./AddSubscriberView";

const SubscribersView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  return (
    <Main style={{ width: "80%" }}>
      <AddSubscriberView isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Flex flexDirection={"column"} padding={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} mb={10}>
          <DateRangePicker
            value={dateRange}
            format={"dd/MM/yyyy"}
            clearIcon={null}
            onChange={(date: any) => {
              setDateRange(date);
            }}
          />
          <Flex justifyContent={"end"} gap={4}>
            <OutlineButtonCom
              text={"Import"}
              icon={<FaUndoAlt />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.RED}
            />
            <OutlineButtonCom
              onClickForOpen={onOpen}
              text={"New"}
              icon={<FaPlus />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.DARKEST_PURPLE}
            />
          </Flex>
        </Flex>
        <DataTableCom />
      </Flex>
    </Main>
  );
};
export default SubscribersView;
