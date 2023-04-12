import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { Filter } from "../helpers/Filters";
import { CampaignCollection } from "/imports/api/campaigns";
import CampaignModel from "/imports/models/CampaignModel";
import { TimesTamp, TimesTampUpdatedAt } from '../helpers/TimesTamp'
import { CategoryCampaignCollection } from "/imports/api/category_campaign";





const db = CampaignCollection;
const CategoryCampaignDB = CategoryCampaignCollection;






export const getCampaign = (id: string) =>
{
   return db.findOne({ _id: id });
}






export const getCampaigns = async (offset: number, filters?: {dateRange : Array<Date>, text: string}) =>
{    
    let data;

    const filteredData = Filter(filters);
    
    const { $text, createdAt }: any = filteredData;
    
    const cursor = db.rawCollection().aggregate(pipelineQuery(offset, createdAt, $text, DataTableEnum.LIMIT, -1));
    
    const result = cursor.toArray();
   
    
    await result.then((res) => {
      data = res;
      
    })

    const totalCount = db.find(filteredData).count();

    return { data, totalCount };
}






export const addCampaign = (campaign: CampaignModel) =>
{
    const newCampaignId = db.insert({...campaign, ...TimesTamp()});

    return newCampaignId;

}






export const updateCampaign = (categoryId: string, campaign: CampaignModel, newCampaignData: {
    name: string;
    description?: string;
    target: string;
  }) =>
{
    db.update({ _id: campaign._id }, { $set: {...newCampaignData,  createdAt: campaign.createdAt, ...TimesTampUpdatedAt()} });

    CategoryCampaignDB.update({ campaign_id: campaign._id }, { $set: { category_id: categoryId } });
}







export const deleteCampaign = (campaign: CampaignModel) =>
{
    db.remove({ _id: campaign._id });
}






//-----relation queries------------

//campaign ile category'ler category_campaign tablosunda campaign_id ile category_id
//ile eşleşiyor ve her campaign ait olduğu category ile birlikte geliyor
const pipelineQuery = (offset?: number, dateRange?: object,  $textForFilter?: object,  limitForFilter?: DataTableEnum, sortForFilter?: Number) => {
  
    return [
      {
        $sort: { createdAt: sortForFilter }
      },
      {
        $match: {
            dateRange,
            $text: $textForFilter,
        }
      },
      {
        $skip: offset 
      },
      {
        $limit: limitForFilter
      },
      {
        $lookup: {
          from: "category_campaign",
          localField: "_id",
          foreignField: "campaign_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "categories",
          localField: "category.category_id",
          foreignField: "_id", 
          as: "category"
        }
      },
      { $unwind: "$category" },
      {
        $project: { 
          _id: 1,
          name: 1,
          description: 1,
          target: 1,
          createdAt: 1,
          updatedAt: 1,
          "category._id": 1,
          "category.name": 1
        }
      }
    ]
  }