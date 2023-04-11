import CategoryModel from "/imports/models/CategoryModel";
import { Meteor } from "meteor/meteor";

export const DeleteOperation = (props: {
  onClose: any;
  handleChangeDataTable: VoidFunction;
  category: CategoryModel;
}) => {
  Meteor.call(
    "delete-category",
    props.category,
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
