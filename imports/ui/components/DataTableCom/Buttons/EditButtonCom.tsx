import React from "react";

import { FaEdit } from "react-icons/fa";
import { ColorsEnum } from "/imports/ui/constants/ColorsEnum";
import OutlineButtonCom from "../../OutlineButtonCom";

const EditButtonCom = (props: { onClick?: VoidFunction }) => {
  return (
    <OutlineButtonCom
      text={"Edit"}
      icon={<FaEdit />}
      customClickColor={ColorsEnum.LIGHTEST_PURPLE}
      customContentColor={ColorsEnum.BLUE}
    />
  );
};

export default EditButtonCom;
