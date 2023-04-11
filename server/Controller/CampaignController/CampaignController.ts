import { Meteor } from "meteor/meteor";
import CampaignModel from "/imports/models/CampaignModel";
import { campaignValidationForAdd, campaignValidationForDelete, campaignValidationForUpdate } from "./validations/campaign-validation";
import { addCampaign, deleteCampaign, getCampaigns, updateCampaign } from "/server/Repositories/CampaignRepository";
import { getCategories } from "/server/Repositories/CategoryRepository";
import { addCategoryCampaignRelation } from "./methods/CategoryCampaignRelation";

export class CampaignController
{
    init() {
        Meteor.methods({
            'add-campaign' (categoryId: string, campaign: CampaignModel, mailSend: boolean) {                
                campaignValidationForAdd(campaign, categoryId);
               
                const campaignId = addCampaign(campaign);

                addCategoryCampaignRelation(categoryId, campaignId);
            },
            'update-campaign' (categoryId: string, campaign: CampaignModel, newCampaignData: {
                name: string;
                description?: string;
                target: string;
              }) {
                campaignValidationForUpdate(newCampaignData, categoryId);
               
                updateCampaign(campaign, newCampaignData);
            },
            'delete-campaign' (campaign: CampaignModel) {
                campaignValidationForDelete(campaign);
                    
                deleteCampaign(campaign);
            },
            'get-campaigns'  (offset: number, filters?:{dateRange: Array<Date>, text: string}) {
                    
                const campaigns = getCampaigns(offset, filters);
                const categories = getCategories();

                return {campaigns, categories};
            }
        })
    }
}