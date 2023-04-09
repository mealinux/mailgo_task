import React from "react";

import { Flex } from "@chakra-ui/react";
import { DeleteButtonCom } from "/imports/ui/components/DataTableCom/Buttons/DeleteButtonCom";
import EditButtonCom from "/imports/ui/components/DataTableCom/Buttons/EditButtonCom";

export const SubscribersData = (props: { data: any; totalCount: number }) => {
  let dataArr: any = [];

  props!.data.forEach((e: any) => {
    dataArr.push({
      _id: e._id,
      name: e.name,
      last_name: e.last_name,
      email: e.email,
      actions: (
        <Flex gap={4}>
          <EditButtonCom />
          <DeleteButtonCom />
        </Flex>
      ),
    });
  });

  return { data: dataArr, totalCount: props.totalCount };
};
