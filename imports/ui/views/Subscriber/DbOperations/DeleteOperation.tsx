import SubscriberModel from "/imports/models/SubscriberModel";
import { Meteor } from "meteor/meteor";

export const DeleteOperation = (props: {
  onClose: any;
  handleChangeDataTable: VoidFunction;
  subscriber: SubscriberModel;
}) => {
  Meteor.call(
    "delete-subscriber",
    props.subscriber,
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
