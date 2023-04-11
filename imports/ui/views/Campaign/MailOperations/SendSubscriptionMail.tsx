import { Meteor } from "meteor/meteor";
import MailModel from "/imports/models/system/MailModel";
import CampaignModel from "/imports/models/CampaignModel";
export const SendSubscriptionMail = (props: {
  mailData: MailModel;
  selectedCampaign: CampaignModel;
}) => {
  Meteor.callAsync(
    "send-subscription-mail",
    props.mailData,
    props.selectedCampaign
  )
    .then((e) => {
      console.log("success!");
    })
    .catch((e) => console.log(e));
};
