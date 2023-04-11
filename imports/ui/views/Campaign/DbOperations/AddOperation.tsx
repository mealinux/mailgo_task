import { Meteor } from "meteor/meteor";

export const AddOperation = (props: {
  onClose: VoidFunction;
  newCampaignData: {
    name: string;
    description?: string;
    target: string;
  };
  handleChangeDataTable: VoidFunction;
  selectedCategoryId: string;
}) => {
  Meteor.call(
    "add-campaign",
    props.selectedCategoryId,
    props.newCampaignData,
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
