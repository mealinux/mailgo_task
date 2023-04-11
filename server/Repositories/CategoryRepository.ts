import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { CategoriesCollection } from "/imports/api/categories";
import CategoryModel from "/imports/models/CategoryModel";
import { Filter } from "../helpers/Filters";
import { CampaignCollection } from "/imports/api/campaigns";
import { TimesTamp, TimesTampUpdatedAt } from '../helpers/TimesTamp'





export const categoryDB = CategoriesCollection;
export const campaignDB = CampaignCollection;

const db = CategoriesCollection;





export const getCategory = (id?: number) =>
{
    
}




export const getCategories = (offset: number = 0, filters?: {dateRange? : Array<Date>, text?: string, limit?: boolean}) =>
{    
    const filteredData = Filter(filters);

    const filterlimit = filters?.limit ? { limit:  DataTableEnum.LIMIT} : {};
    
    const data = db.find(filteredData, {skip: offset, filterlimit, sort: ['createdAt', 'desc']}).fetch();
        
    const totalCount = db.find(filteredData).count();

    return { data, totalCount };
}






export const addCategory = (category: CategoryModel) =>
{
    db.insert({...category, ...TimesTamp()});
}






export const updateCategory = (category: CategoryModel, newCategoryData: {
    name: string;
    description: string;
  }) =>
{
    db.update({ _id: category._id }, { $set: {...newCategoryData,  createdAt: category.createdAt, ...TimesTampUpdatedAt()} });
}






export const deleteCategory = (category: CategoryModel) =>
{
    db.remove({ _id: category._id });
}






// relation queries--------------------------------------------
export const getCategoryWithCampaigns = (cateogryId: string) =>
{    
    
    let categoryWithCampaign;

    const pipeline = [
        {
          $match: {
            category_id: cateogryId
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
      
      const cursor = db.rawCollection().aggregate(pipeline);
      const result = cursor.toArray();

      result.then((res) => {
        
        categoryWithCampaign = res;
        
      })

      return categoryWithCampaign;
}
