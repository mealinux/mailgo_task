import { Meteor } from "meteor/meteor";
import MailModel from "/imports/models/system/MailModel";
export const SendSubscriptionMail = (props: { mailData: MailModel }) => {
  Meteor.callAsync("send-subscription-mail", props.mailData)
    .then((e) => {
      console.log("success!");
    })
    .catch((e) => console.log(e));
};
