import { Meteor } from "meteor/meteor";

export const AddOperation = (props: {
  onClose: VoidFunction;
  newCategoryData: {
    name: string;
    description: string;
  };
  handleChangeDataTable: VoidFunction;
}) => {
  Meteor.call(
    "add-category",
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
