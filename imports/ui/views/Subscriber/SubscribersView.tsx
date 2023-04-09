import React, { useContext, useEffect, useState } from "react";
import Main from "../../Main";
import { Center, Flex, Input, Spinner, useDisclosure } from "@chakra-ui/react";
import DataTableCom from "../../components/DataTableCom/DataTableCom";

import { FaPlus, FaUndoAlt, FaTimes, FaFilter } from "react-icons/fa";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { Meteor } from "meteor/meteor";
import { DataTableEnum } from "../../constants/DataTableEnum";
import { SubscribersData } from "./data/SubscribersData";
import AddSubscriberView from "./AddSubscriberView";
import { DataColumns } from "./data/DataColumns";
import UtilContext from "/imports/context/UtilContext";

const SubscribersView = (props: { title: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const utilContext = useContext(UtilContext);

  const [showFilter, setShowFilter] = useState(false);

  const [filterDateRange, setFilterDateRange] = useState([
    new Date(),
    new Date(),
  ]);

  const [filterText, setFilterText] = useState("");

  const [dataOffset, setDataOffset] = useState(0);

  const [subscribeData, setSubscribeData] = useState<{
    data: Array<Object>;
    totalCount: number;
  }>();

  useEffect(() => {
    utilContext?.setProgressBar(false);
    handleChangeDataTable();
  }, []);

  const handleChangeDataTable = (
    offset: number = 0,
    dateRange?: Array<Date>,
    text?: string
  ) => {
    Meteor.callAsync("get-subscribers", offset, {
      dateRange,
      text,
    })
      .then((res: { data: Array<Object>; totalCount: number }) => {
        const data = SubscribersData(res);

        setSubscribeData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => utilContext?.setProgressBar(false));
  };

  return (
    <Main style={{ width: "80%" }} title={props.title}>
      <AddSubscriberView
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        setSubscribeData={setSubscribeData}
        handleChangeDataTable={handleChangeDataTable}
      />
      <Flex flexDirection={"column"} padding={10}>
        <Flex justifyContent={"space-between"} alignItems={"center"} mb={10}>
          <Flex mb={4}>
            {showFilter ? (
              <DateRangePicker
                value={filterDateRange}
                format={"dd/MM/y"}
                clearIcon={<FaTimes />}
                onChange={(date: any) => {
                  setFilterDateRange(date);

                  handleChangeDataTable(dataOffset, date);

                  utilContext?.setProgressBar(true);
                }}
              />
            ) : (
              <div></div>
            )}
          </Flex>

          <Flex justifyContent={"end"} gap={4}>
            <Input
              placeholder="Search"
              size="sm"
              htmlSize={20}
              mb={4}
              width={"auto"}
              bg={ColorsEnum.WHITE}
              borderColor={ColorsEnum.LIGHT_GREY}
              onChange={(event) => {
                if (event.target.value.length > 2) {
                  setFilterText(event.target.value);
                  setShowFilter(false);
                  handleChangeDataTable(
                    dataOffset,
                    filterDateRange,
                    event.target.value
                  );
                } else {
                  setFilterText("");
                  handleChangeDataTable();
                }
              }}
            />
            <OutlineButtonCom
              text={"Filter"}
              icon={<FaFilter />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={
                showFilter ? ColorsEnum.BLACK : ColorsEnum.GREY
              }
              onClick={() => {
                if (showFilter) {
                  setShowFilter(false);
                  handleChangeDataTable();
                } else {
                  setShowFilter(true);
                }
              }}
            />
            <OutlineButtonCom
              text={"Import"}
              icon={<FaUndoAlt />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.RED}
            />
            <OutlineButtonCom
              onClick={onOpen}
              text={"New"}
              icon={<FaPlus />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.DARKEST_PURPLE}
            />
          </Flex>
        </Flex>
        {subscribeData ? (
          <DataTableCom
            data={subscribeData.data}
            totalCount={subscribeData.totalCount}
            columns={DataColumns()}
            onChangePage={(page, totalRows) => {
              const offset = (page - 1) * DataTableEnum.LIMIT;

              setDataOffset(offset);

              handleChangeDataTable(offset, filterDateRange, filterText);
            }}
          />
        ) : (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}
      </Flex>
    </Main>
  );
};
export default SubscribersView;
