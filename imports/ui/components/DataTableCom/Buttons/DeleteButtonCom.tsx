import React from "react";

import { FaTrashAlt } from "react-icons/fa";
import { ColorsEnum } from "/imports/ui/constants/ColorsEnum";
import OutlineButtonCom from "../../OutlineButtonCom";

export const DeleteButtonCom = (props: { onClick: VoidFunction }) => {
  return (
    <OutlineButtonCom
      onClick={() => props.onClick()}
      icon={<FaTrashAlt />}
      customClickColor={ColorsEnum.LIGHTEST_PURPLE}
      customContentColor={ColorsEnum.RED}
    />
  );
};
