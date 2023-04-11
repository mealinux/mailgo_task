import { Meteor } from "meteor/meteor";
import CampaignModel from "/imports/models/CampaignModel";
import { campaignValidationForAdd, campaignValidationForDelete, campaignValidationForUpdate } from "./validations/campaign-validation";
import { addCampaign, deleteCampaign, getCampaign, getCampaigns, updateCampaign } from "/server/Repositories/CampaignRepository";
import { getCategories } from "/server/Repositories/CategoryRepository";
import { AddCategoryCampaignRelation } from "./methods/CategoryCampaignRelation";
import { SendMailForSubscription } from "/server/Mail/methods/SendMail";

export class CampaignController
{
    init() {
        Meteor.methods({
            'add-campaign' (categoryId: string, newCampaign: CampaignModel, mailSend: boolean) {                
                campaignValidationForAdd(newCampaign, categoryId);
               
                const campaignId = addCampaign(newCampaign);

                const campaign = getCampaign(campaignId);


                const mailData = {
                    subject: campaign!.name,
                    content: campaign!.description,
                }

                SendMailForSubscription(mailData, campaign)

                AddCategoryCampaignRelation(categoryId, campaignId);
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