import { CategoryCampaignCollection } from "/imports/api/category_campaign";
import { TimesTamp } from '../../../helpers/TimesTamp'

export const categoryCampaignDB = CategoryCampaignCollection;

export const AddCategoryCampaignRelation = (categoryId: string, campaignId: string) =>
{    
    categoryCampaignDB.insert({ category_id: categoryId, campaign_id: campaignId, ...TimesTamp() })
}

