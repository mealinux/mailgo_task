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

import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { useModal } from "/imports/context/UtilContext";

const RegisterView = () => {
  const navigate = useNavigate();

  const { progressBar, setProgressBar } = useModal();

  const [name, setName] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [password, setPassword] = useState("");

  const registerHandle = () => {
    setProgressBar(true);

    setTimeout(() => {
      const user = {
        profile: { name, last_name },
        email,
        company_name,
        password,
      };

      Accounts.createUser(user, (error) => {
        if (error) {
          setProgressBar(false);
        } else {
          navigate(RoutesEnum.DASHBOARD);
        }
      });
    });
  };

  useEffect(() => {
    if (Meteor.userId()) {
      navigate(RoutesEnum.DASHBOARD);
    }
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
                    onChange={(event) => setName(event.target.value)}
                  />
                </Box>
                <Box>
                  <Input
                    placeholder="Last Name"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                    onChange={(event) => setLast_name(event.target.value)}
                  />
                </Box>
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
                    placeholder="Company Name"
                    size="md"
                    htmlSize={30}
                    width={"auto"}
                    bg={ColorsEnum.WHITE}
                    onChange={(event) => setCompany_name(event.target.value)}
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
                    onClick={() => navigate(RoutesEnum.LOGIN)}
                  >
                    Log in
                  </Button>
                  <Button
                    isLoading={progressBar}
                    bg={ColorsEnum.MEDIUM_PURPLE}
                    size="md"
                    rightIcon={<FaArrowCircleRight />}
                    onClick={() => registerHandle()}
                  >
                    Sign up
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

export default RegisterView;
