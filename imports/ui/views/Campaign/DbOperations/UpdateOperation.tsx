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
  Meteor.call("send-mail", (err: Meteor.Error, res: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });

  Meteor.call(
    "update-campaign",
    props.selectedCategoryId,
    props.campaign,
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
