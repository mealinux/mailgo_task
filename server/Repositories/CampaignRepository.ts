import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { Filter } from "../helpers/Filters";
import { CampaignsCollection } from "/imports/api/campaigns";
import CampaignModel from "/imports/models/CampaignModel";


const db = CampaignsCollection;


export const getCampaign = (id?: number) =>
{
    
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
    const newCampaignId = db.insert({...campaign, createdAt: new Date(), updatedAt: new Date()});

    return newCampaignId;
    
}

export const updateCampaign = (campaign: CampaignModel, newCampaignData: {
    name: string;
    description?: string;
    target: string;
  }) =>
{
    db.update({ _id: campaign._id }, {...newCampaignData,  createdAt: campaign.createdAt, updatedAt: new Date()});
}

export const deleteCampaign = (campaign: CampaignModel) =>
{
    db.remove({ _id: campaign._id });
}
