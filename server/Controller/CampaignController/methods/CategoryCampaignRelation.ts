import { CampaignsCollection } from "/imports/api/campaigns";
import { CategoriesCollection } from "/imports/api/categories";
import { CategoryCampaignCollection } from "/imports/api/category_campaign";


export const categoryCampaignDB = CategoryCampaignCollection;
export const categoryDB = CategoriesCollection;
export const campaignDB = CampaignsCollection;


export const addCategoryCampaignRelation = (categoryId: string, campaignId: string) =>
{    
    
    categoryCampaignDB.insert({ category_id: categoryId, campaign_id: campaignId, createdAt: new Date(), updatedAt: new Date() })
}   


export const getCategoryCampaignRelations = () =>
{    
    
    const pipeline = [
        {
          $match: {
            category_id: 'TWjwbmehAp7g75x2H'
          }
        },
        {
          $lookup: {
            from: 'campaigns',
            localField: 'campaign_id',
            foreignField: '_id',
            as: 'campaign'
          }
        },
        {
          $unwind: '$campaign'
        }
      ];
      
      const cursor = categoryCampaignDB.rawCollection().aggregate(pipeline);
      const result = cursor.toArray();

      console.log(result.then((res) => {
        console.log(res);
        
      }));
      

}

