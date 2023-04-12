import React from "react";

import { Text } from "@chakra-ui/react";
import { ColorsEnum } from "/imports/ui/constants/ColorsEnum";

export const DataColumns = () => {
  return [
    {
      name: "Name",
      selector: (row: { subscribe: any }) => row.subscribe.name,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row: { subscribe: any }) => row.subscribe.last_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { subscribe: any }) => row.subscribe.email,
      sortable: true,
    },
    {
      name: "State",
      selector: (row: { subscribe: any }) =>
        row.subscribe.state ? (
          <Text color={ColorsEnum.DARKEST_PURPLE}>Active</Text>
        ) : (
          <Text color={ColorsEnum.RED}>Passive</Text>
        ),
    },
    {
      name: "Actions",
      selector: (row: { actions: any }) => row.actions,
    },
  ];
};
