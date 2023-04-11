import SubscriberModel from "/imports/models/SubscriberModel";
import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { SubscribersCollection } from "/imports/api/subscribers";
import { Filter } from "../helpers/Filters";
import { TimesTamp, TimesTampUpdatedAt } from '../helpers/TimesTamp'


const db = SubscribersCollection;






export const getSubscriber = (subscriberId: string) =>
{
    return db.findOne({ _id: subscriberId });
}







export const getSubscribers = (offset: number = 0, state: Array<number> = [0, 1], filters?: {dateRange? : Array<Date>, text?: string}) =>
{    
    const filteredData = Filter(filters, state);

    const data = db.find(filteredData, {skip: offset, limit: DataTableEnum.LIMIT, sort: ['createdAt', 'desc']}).fetch();
        
    const totalCount = db.find(filteredData).count();

    return { data, totalCount };
}







export const addSubscriber = (subscriber: SubscriberModel) =>
{
    db.insert({...subscriber,  state: 1,  ...TimesTamp()});
}







export const updateSubscriber = (subscriber: SubscriberModel, newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  }) =>
{
    db.update({ _id: subscriber._id }, { $set: {...newSubscriberData,  createdAt: subscriber.createdAt, ...TimesTampUpdatedAt() }});
}







export const deleteSubscriber = (subscriber: SubscriberModel) =>
{
    db.remove({ _id: subscriber._id });    
}







// relation queries--------------------------------------------
export const getSubscriberWithCampaigns = (cateogryId: string) =>
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
