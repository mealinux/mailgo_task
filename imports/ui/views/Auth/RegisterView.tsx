import React from "react";

import {
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
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { RoutesEnum } from "../../constants/RoutesEnum";

import { Link } from "react-router-dom";

const RegisterView = () => {
  return (
    <Body>
      <Container maxW={"container.md"}>
        <Card bg={ColorsEnum.DARK_PURPLE}>
          <CardBody minW={"container.md"}>
            <Flex
              justifyContent={"space-evenly"}
              alignItems={"center"}
              minH={400}
            >
              <Flex justifyContent={"center"} width={"auto"}>
                <Text fontSize={TextEnum.H1_SIZE} color={ColorsEnum.WHITE}>
                  mailGo
                </Text>
              </Flex>
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
                <Flex>
                  <Input
                    placeholder="Full Name"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Flex>
                <Flex>
                  <Input
                    placeholder="E-mail"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Flex>
                <Flex>
                  <Input
                    placeholder="Company Name"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Flex>
                <Flex>
                  <Input
                    placeholder="Password"
                    type="password"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                  />
                </Flex>
                <Flex justifyContent={"space-evenly"}>
                  <Link to={RoutesEnum.LOGIN}>
                    <Button
                      bg={ColorsEnum.MEDIUM_PURPLE}
                      size="md"
                      leftIcon={<ArrowForwardIcon />}
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link to={RoutesEnum.REGISTER}>
                    <Button
                      bg={ColorsEnum.MEDIUM_PURPLE}
                      size="md"
                      rightIcon={<ArrowForwardIcon />}
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
