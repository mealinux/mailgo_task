import React from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { Body } from "../../layouts/Body";
import { ColorsEnum } from "../../constants/ColorsEnum";
import { TextEnum } from "../../constants/TextEnum";
import { RoutesEnum } from "../../constants/RoutesEnum";

import { Link } from "react-router-dom";

import { FaArrowCircleRight } from "react-icons/fa";

const RegisterView = () => {
  return (
    <Body>
      <Container maxW={"container.md"} mt={20}>
        <Card bg={ColorsEnum.DARK_PURPLE}>
          <CardBody minW={"container.md"}>
            <Flex
              justifyContent={"space-evenly"}
              alignItems={"center"}
              minH={400}
            >
              <Box>
                <Text fontSize={TextEnum.H1_SIZE} color={ColorsEnum.WHITE}>
                  mailGo
                </Text>
              </Box>
              <Flex
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={4}
              >
                <Flex justifyContent={"center"} alignItems={"start"}>
                  <Text
                    fontSize={TextEnum.H4_SIZE}
                    color={ColorsEnum.LIGHT_PURPLE}
                  >
                    REGISTER
                  </Text>
                </Flex>
                <Box>
                  <Input
                    placeholder="First Name"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Box>
                <Box>
                  <Input
                    placeholder="Last Name"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Box>
                <Box>
                  <Input
                    placeholder="E-mail"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Box>
                <Box>
                  <Input
                    placeholder="Company Name"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Box>
                <Box>
                  <Input
                    placeholder="Password"
                    type="password"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Box>
                <Flex justifyContent={"space-evenly"}>
                  <Link to={RoutesEnum.LOGIN}>
                    <Button
                      bg={ColorsEnum.MEDIUM_PURPLE}
                      size="md"
                      leftIcon={<FaArrowCircleRight />}
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to={RoutesEnum.REGISTER}>
                    <Button
                      bg={ColorsEnum.MEDIUM_PURPLE}
                      size="md"
                      rightIcon={<FaArrowCircleRight />}
                    >
                      Sign up
                    </Button>
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </Body>
  );
};

export default RegisterView;
