import React, { useState } from "react";
import Main from "../../Main";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { RoutesEnum } from "../../constants/RoutesEnum";
import { ColorsEnum } from "../../constants/ColorsEnum";
import { TextEnum } from "../../constants/TextEnum";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Meteor } from "meteor/meteor";

const MailView = (props: { title: string }) => {
  const [subject, setSubject] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [progressBar, setProgressBar] = useState<boolean>(false);

  const handleClickMail = async () => {
    setProgressBar(true);

    const mailData = {
      subject,
      content,
    };
    await Meteor.callAsync("send-info-mail", mailData)
      .then(() => {
        setSubject("");
        setContent("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setProgressBar(false));
  };

  return (
    <Main style={{ width: "80%" }} title={props.title}>
      <Flex flexDirection={"column"} p={10}>
        <Alert status="warning">
          <AlertIcon />
          This mail will send to all your subscribers
        </Alert>
        <Input
          type={"text"}
          placeholder="Subject"
          mb={5}
          mt={5}
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />
        <Textarea
          placeholder="Content"
          value={content}
          rows={15}
          mb={5}
          onChange={(e) => setContent(e.target.value)}
        />
        <Flex justifyContent={"center"}>
          <Button
            isLoading={progressBar}
            isActive={RoutesEnum.MAIL === window.location.pathname}
            textColor={ColorsEnum.GREY}
            bg={ColorsEnum.WHITE}
            _hover={{
              textColor: ColorsEnum.DARKEST_PURPLE,
            }}
            _active={{
              bg: ColorsEnum.LIGHTEST_PURPLE,
              textColor: ColorsEnum.DARKEST_PURPLE,
            }}
            _focus={{
              textColor: ColorsEnum.DARKEST_PURPLE,
              bg: ColorsEnum.WHITE,
            }}
            onClick={async () => {
              await handleClickMail();
            }}
            padding={3}
            borderRadius={30}
            width={130}
            display={"flex"}
            justifyContent={"start"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text fontSize={TextEnum.TINY_SIZE} fontWeight={"light"}>
                SUBMIT
              </Text>
              <FaArrowAltCircleRight
                fontSize={TextEnum.MEDIUM_SIZE}
                style={{ marginLeft: "5px" }}
              />
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </Main>
  );
};
export default MailView;
