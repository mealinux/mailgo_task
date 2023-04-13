import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { ColorsEnum } from "../constants/ColorsEnum";

import {
  FaAlignJustify,
  FaUser,
  FaBuromobelexperte,
  FaTable,
  FaEnvelope,
} from "react-icons/fa";
import { TextEnum } from "../constants/TextEnum";
import { useNavigate } from "react-router";
import { RoutesEnum } from "../constants/RoutesEnum";
import SidebarButtonCom from "../components/SidebarButtonCom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Box bg={ColorsEnum.WHITE} width={"15%"}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Flex
          flexDirection={"column"}
          justifyItems={"start"}
          alignItems={"start"}
          gap={2}
        >
          <SidebarButtonCom
            isActive={RoutesEnum.DASHBOARD === window.location.pathname}
            onClick={() => navigate(RoutesEnum.DASHBOARD)}
            text="Dashboard"
            icon={<FaAlignJustify fontSize={TextEnum.MEDIUM_SIZE} />}
          />

          <SidebarButtonCom
            isActive={RoutesEnum.SUBSCRIBERS === window.location.pathname}
            onClick={() => navigate(RoutesEnum.SUBSCRIBERS)}
            text="Subscribers"
            icon={<FaUser fontSize={TextEnum.MEDIUM_SIZE} />}
          />

          <SidebarButtonCom
            isActive={RoutesEnum.CATEGORY === window.location.pathname}
            onClick={() => navigate(RoutesEnum.CATEGORY)}
            text="Categories"
            icon={<FaBuromobelexperte fontSize={TextEnum.MEDIUM_SIZE} />}
          />

          <SidebarButtonCom
            isActive={RoutesEnum.CAMPAIGN === window.location.pathname}
            onClick={() => navigate(RoutesEnum.CAMPAIGN)}
            text="Campaigns"
            icon={<FaTable fontSize={TextEnum.MEDIUM_SIZE} />}
          />

          <SidebarButtonCom
            isActive={RoutesEnum.MAIL === window.location.pathname}
            onClick={() => navigate(RoutesEnum.MAIL)}
            text="Send a Mail"
            icon={<FaEnvelope fontSize={TextEnum.MEDIUM_SIZE} />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
