import { Meteor } from "meteor/meteor";
import MailModel from "/imports/models/system/MailModel";

export const SendInfoMail = (props: {
  mailData: MailModel;
  subscriberId: string;
}) => {
  Meteor.call(
    "send-info-mail",
    props.mailData,
    props.subscriberId,
    (err: Meteor.Error, res: any) => {
      if (err) {
        console.log(err);
      } else {
      }
    }
  );
};
