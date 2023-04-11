import CampaignModel from "/imports/models/CampaignModel";
import CategoryModel from "/imports/models/CategoryModel";
import { Meteor } from "meteor/meteor";

export const DeleteOperation = (props: {
  onClose: any;
  handleChangeDataTable: VoidFunction;
  campaign: CampaignModel;
}) => {
  Meteor.call(
    "delete-campaign",
    props.campaign,
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
