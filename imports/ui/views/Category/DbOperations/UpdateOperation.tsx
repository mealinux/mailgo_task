import CategoryModel from "/imports/models/CategoryModel";
import { Meteor } from "meteor/meteor";

export const UpdateOperation = (props: {
  onClose: any;
  handleChangeDataTable: VoidFunction;
  category: CategoryModel;
  newCategoryData: {
    name: string;
    description: string;
  };
}) => {
  Meteor.call(
    "update-category",
    props.category,
    props.newCategoryData,
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
