import React from "react";

import { FaEye } from "react-icons/fa";
import { ColorsEnum } from "/imports/ui/constants/ColorsEnum";
import OutlineButtonCom from "../../OutlineButtonCom";

export const DetailButtonCom = (props: { onClick: VoidFunction }) => {
  return (
    <OutlineButtonCom
      onClick={async () => await props.onClick()}
      icon={<FaEye />}
      customClickColor={ColorsEnum.LIGHTEST_PURPLE}
      customContentColor={ColorsEnum.BLUE}
    />
  );
};
