import React, { useEffect, useState } from "react";

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

import { useNavigate } from "react-router-dom";

import { FaArrowCircleRight } from "react-icons/fa";
import { Meteor } from "meteor/meteor";
import { useUtilState } from "/imports/States/UtilState";

const LoginView = () => {
  const navigate = useNavigate();
  const setProgressBar = useUtilState((state: any) => state.setProgressBar);

  const progressBar = useUtilState((state: any) => state.progressBar);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = () => {
    setProgressBar(true);

    setTimeout(() => {
      Meteor.loginWithPassword({ email: email }, password, (error?: Error) => {
        if (error) {
          setProgressBar(false);
        } else {
          navigate(RoutesEnum.DASHBOARD);
        }
      });
    });
  };

  useEffect(() => {
    setProgressBar(false);
  }, []);

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
              <Box justifyContent={"center"} width={"auto"}>
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
                    LOGIN
                  </Text>
                </Flex>
                <Box>
                  <Input
                    placeholder="E-mail"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                    onChange={(event) => setEmail(event.target.value)}
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
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Box>
                <Flex justifyContent={"space-evenly"}>
                  <Button
                    bg={ColorsEnum.MEDIUM_PURPLE}
                    size="md"
                    leftIcon={<FaArrowCircleRight />}
                    onClick={() => navigate(RoutesEnum.REGISTER)}
                  >
                    Sign up
                  </Button>
                  <Button
                    isLoading={progressBar}
                    bg={ColorsEnum.MEDIUM_PURPLE}
                    size="md"
                    rightIcon={<FaArrowCircleRight />}
                    onClick={() => loginHandle()}
                  >
                    Log in
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Container>
    </Body>
  );
};

export default LoginView;
