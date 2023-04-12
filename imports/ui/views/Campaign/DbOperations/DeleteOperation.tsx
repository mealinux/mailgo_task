import CampaignModel from "/imports/models/CampaignModel";
import CategoryModel from "/imports/models/CategoryModel";
import { Meteor } from "meteor/meteor";

export const DeleteOperation = (props: {
  onClose: any;
  handleChangeDataTable: VoidFunction;
  campaign: CampaignModel;
}) => {
  Meteor.callAsync("delete-campaign", props.campaign)
    .then((res: any) => {
      props.handleChangeDataTable();
      props.onClose();
    })
    .catch((err) => {
      console.log(err);
    });
};
