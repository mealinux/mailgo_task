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
  /* Meteor.call("send-subscription-mail", (err: Meteor.Error, res: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  }); */

  Meteor.callAsync(
    "add-campaign",
    props.selectedCategoryId,
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
