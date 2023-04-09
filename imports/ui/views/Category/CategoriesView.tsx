import React, { useEffect, useState } from "react";
import Main from "../../Main";
import { Flex, useDisclosure } from "@chakra-ui/react";

import { FaPlus } from "react-icons/fa";
import OutlineButtonCom from "../../components/OutlineButtonCom";
import { ColorsEnum } from "../../constants/ColorsEnum";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import AddCategoryView from "./AddCategoryView";
import { Meteor } from "meteor/meteor";

const CategoriesView = (props: { title: string }) => {
  const [value, setValue] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  useEffect(() => {
    Meteor.call("category", {}, (err: any, res: any) => {
      if (err) {
        alert(err);
      } else {
        console.log(res);
      }
    });
  }, []);

  return (
    <Main style={{ width: "80%" }} title={props.title}>
      <AddCategoryView isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
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
          <Flex justifyContent={"end"}>
            <OutlineButtonCom
              onClick={onOpen}
              text={"New"}
              icon={<FaPlus />}
              customClickColor={ColorsEnum.LIGHTEST_PURPLE}
              customContentColor={ColorsEnum.DARKEST_PURPLE}
            />
          </Flex>
        </Flex>
        {/* <DataTableCom /> */}
      </Flex>
    </Main>
  );
};

export default CategoriesView;
