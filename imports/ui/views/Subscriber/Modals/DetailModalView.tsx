import React, { Dispatch, ReactElement, SetStateAction } from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";

import ModalUtil from "../../../utils/ModalUtil";
import { ActionEnum } from "../../../constants/ActionEnum";
import SubscriberModel from "/imports/models/SubscriberModel";
import { Meteor } from "meteor/meteor";
import { TextEnum } from "/imports/ui/constants/TextEnum";
import { ColorsEnum } from "/imports/ui/constants/ColorsEnum";

const DetailModalView = (props: {
  handleChangeDataTable: VoidFunction;
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  actionType: ActionEnum;
  modalTitle: string;
  modalButtonText: string;
  modalIcon: ReactElement;
  selectedSubscriber: SubscriberModel;

  progressBarForDetailModal: boolean;
  subscriberDetail: {
    campaignClickNumberOfSubscriber: number;
    mailNumberOfSubscriber: number;
    categoriesOfSubscriber: Array<{ name: string }>;
  };
}) => {
  return (
    <ModalUtil
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={props.modalTitle}
      buttonText={props.modalButtonText}
      icon={props.modalIcon}
      actionType={props.actionType}
    >
      {props.progressBarForDetailModal || !props.subscriberDetail ? (
        <Center>
          <Spinner size="xl" />
        </Center>
      ) : (
        <Flex flexDirection={"column"}>
          <Flex justifyContent={"space-around"}>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Text fontSize={TextEnum.SMALL_SIZE}>Campaign Click</Text>
              <Text fontSize={TextEnum.LARGE_SIZE} fontWeight={"bold"}>
                {props.subscriberDetail.campaignClickNumberOfSubscriber.toString()}
              </Text>
            </Flex>
            <Flex>
              <Flex flexDirection={"column"} alignItems={"center"}>
                <Text fontSize={TextEnum.SMALL_SIZE}>Sent Mail</Text>
                <Text fontSize={TextEnum.LARGE_SIZE} fontWeight={"bold"}>
                  {props.subscriberDetail.mailNumberOfSubscriber.toString()}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {
            <Flex flexDirection={"column"}>
              <Flex mt={4}>
                <Text fontSize={TextEnum.MEDIUM_SIZE} mb={3} mr={3}>
                  Categories
                </Text>
                <Divider
                  bgColor={ColorsEnum.LIGHT_GREY}
                  height={0.5}
                  mt={3}
                  mb={3}
                />
              </Flex>
              <Flex>
                {RenderCategories(
                  props.subscriberDetail.categoriesOfSubscriber
                )}
              </Flex>
            </Flex>
          }
        </Flex>
      )}
    </ModalUtil>
  );
};

const RenderCategories = (categories: Array<{ name: string }>) => {
  return (
    <List spacing={3} height={"150"} overflow={"scroll"} width={"100%"}>
      {categories.map((category: { name: string }, index: number) => {
        return (
          <ListItem key={index}>
            <Flex alignItems={"center"} gap={2}>
              <Box
                height={2}
                width={2}
                bgColor={ColorsEnum.BLACK}
                borderRadius={20}
              />
              <Text>{category.name}</Text>
            </Flex>
          </ListItem>
        );
      })}
    </List>
  );
};

export const getSubscriberDetail = async (props: {
  subscriberId: string;
  setProgressBarForDetailModal: Dispatch<SetStateAction<boolean>>;
  setSubscriberDetail: Dispatch<SetStateAction<any>>;
}) => {
  props.setProgressBarForDetailModal(true);
  await Meteor.callAsync("get-subscriber-detail", props.subscriberId)
    .then((res) => {
      props.setSubscriberDetail(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => props.setProgressBarForDetailModal(false));
};

export default DetailModalView;
