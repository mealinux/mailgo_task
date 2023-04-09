import SubscriberModel from "/imports/models/SubscriberModel";
import { Meteor } from "meteor/meteor";

export const UpdateOperation = (props: {
  onClose: any;
  handleChangeDataTable: VoidFunction;
  subscriber: SubscriberModel;
  newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  };
}) => {
  Meteor.call(
    "update-subscriber",
    props.subscriber,
    props.newSubscriberData,
    (err: Meteor.Error, res: any) => {
      if (err) {
        console.log(err);
      } else {
        props.handleChangeDataTable();
        props.onClose();
      }
    }
  );
};
