import CampaignModel from "/imports/models/CampaignModel";
import { Meteor } from "meteor/meteor";

export const UpdateOperation = (props: {
  onClose: any;
  handleChangeDataTable: VoidFunction;
  campaign: CampaignModel;
  newCampaignData: {
    name: string;
    description?: string;
    target: string;
  };
  selectedCategoryId: string;
}) => {
  Meteor.callAsync(
    "update-campaign",
    props.selectedCategoryId,
    props.campaign,
    props.newCampaignData
  )
    .then((res: any) => {
      props.handleChangeDataTable();
      props.onClose();
    })
    .catch((err) => {
      console.log(err);
    });
};
