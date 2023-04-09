import { Meteor } from "meteor/meteor";

export const AddOperation = (props: {
  onClose: VoidFunction;
  newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  };
  handleChangeDataTable: VoidFunction;
}) => {
  Meteor.call(
    "add-subscriber",
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
