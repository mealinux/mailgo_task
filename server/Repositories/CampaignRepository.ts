import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { Filter } from "../helpers/Filters";
import { CampaignCollection } from "/imports/api/campaigns";
import CampaignModel from "/imports/models/CampaignModel";
import { TimesTamp, TimesTampUpdatedAt } from '../helpers/TimesTamp'





const db = CampaignCollection;






export const getCampaign = (id: string) =>
{
   return db.findOne({ _id: id });
}






export const getCampaigns = (offset: number, filters?: {dateRange : Array<Date>, text: string}) =>
{    
    const filteredData = Filter(filters);
    
    const data = db.find(filteredData, {skip: offset, limit: DataTableEnum.LIMIT, sort: ['createdAt', 'desc']}).fetch();
        
    const totalCount = db.find(filteredData).count();

    return { data, totalCount };
}






export const addCampaign = (campaign: CampaignModel) =>
{
    const newCampaignId = db.insert({...campaign, ...TimesTamp()});

    return newCampaignId;

}






export const updateCampaign = (campaign: CampaignModel, newCampaignData: {
    name: string;
    description?: string;
    target: string;
  }) =>
{
    db.update({ _id: campaign._id }, { $set: {...newCampaignData,  createdAt: campaign.createdAt, ...TimesTampUpdatedAt()} });
}







export const deleteCampaign = (campaign: CampaignModel) =>
{
    db.remove({ _id: campaign._id });
}
