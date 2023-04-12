import SubscriberModel from "/imports/models/SubscriberModel";
import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { SubscribersCollection } from "/imports/api/subscribers";
import { Filter } from "../helpers/Filters";
import { TimesTamp, TimesTampUpdatedAt } from '../helpers/TimesTamp'
import { SubscriberClickCollection } from "/imports/api/subscriber_click_actions";
import { MailSendCollection } from "/imports/api/mail_send_actions";


const db = SubscribersCollection;
const subscriberClickDB = SubscriberClickCollection;
const MailSendDB = MailSendCollection;






export const getSubscriber = (subscriberId: string) =>
{
    return db.findOne({ _id: subscriberId });
}







export const getSubscribers = (offset: number = 0, state: Array<number> = [0, 1], filters?: {dateRange? : Array<Date>, text?: string}) =>
{    
    const filteredData = Filter(filters, state);
    
    const data = db.find(filteredData, {skip: offset, limit: DataTableEnum.LIMIT, sort: ['createdAt', 'desc']}).fetch();
        
    const totalCount =  db.find(filteredData).count();

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







export const deleteSubscriber = (subscriberId: string) =>
{
    db.remove({ _id: subscriberId});    
}







export  const getCampaignClickCountOfSubscriber = async (subscriberId: string) =>
{    
    const campaignClickCount = subscriberClickDB.find({ subscriber_id: subscriberId }).countAsync();

    return campaignClickCount;
}







export const getMailCountOfSubscriber = async (subscriberId: string) =>
{    
    const mailCount = MailSendDB.find({ subscriber_id: subscriberId }).countAsync();

    return mailCount;
}






// relation queries--------------------------------------------


//gelen subscriberId'yi kullanıp mail_send_actions tablosundaki subscriber_id ile eşleştirip 
//burdaki campaign_id ile category_campaign tablosundaki campaign_id'yi eşleştirip
//burdaki category_id'lerle categories tablosundaki categorileri unique bir şekilde getiren query
export const getCategoriesOfSubscriber = async (subscriberId: string) =>
{    
    
    let subscribeWithCategory;

    const pipeline = [
      {
        $match: { _id: subscriberId }
      },
      {
        $lookup: {
          from: 'mail_send_actions',
          localField: '_id',
          foreignField: 'subscriber_id',
          as: 'campaigns'
        }
      },
      {
        $unwind: '$campaigns'
      },
      {
        $lookup: {
          from: 'campaigns',
          localField: 'campaigns.campaign_id',
          foreignField: '_id',
          as: 'campaign'
        }
      },
      {
        $unwind: '$campaign'
      },
      {
        $lookup: {
          from: 'category_campaign',
          localField: 'campaign._id',
          foreignField: 'campaign_id',
          as: 'campaign_category'
        }
      },
      {
        $unwind: '$campaign_category'
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'campaign_category.category_id',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $unwind: '$categories'
      },
      {
        $group: {
          _id: '$categories._id',
          name: { $first: '$categories.name' },
        }
      },
      {
        $project: {
          _id: 0,
          createdAt: 1,
          description: 1,
          name: 1,
          updatedAt: 1
        } 
      }
    ];
      
      const cursor = db.rawCollection().aggregate(pipeline);
      const result = cursor.toArray();

      await result.then((res) => {
        subscribeWithCategory = res;
        
      })

      return subscribeWithCategory;
}