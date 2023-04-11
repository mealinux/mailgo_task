import SubscriberModel from "/imports/models/SubscriberModel";
import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { SubscribersCollection } from "/imports/api/subscribers";
import { Filter } from "../helpers/Filters";


const db = SubscribersCollection;


export const getSubscriber = (subscriberId: string) =>
{
    return db.findOne({ _id: subscriberId });
}

export const getSubscribers = (offset: number = 0, filters?: {dateRange? : Array<Date>, text?: string}) =>
{    
    const filteredData = Filter(filters);

    const data = db.find(filteredData, {skip: offset, limit: DataTableEnum.LIMIT, sort: ['createdAt', 'desc']}).fetch();
        
    const totalCount = db.find(filteredData).count();

    return { data, totalCount };
}


export const addSubscriber = (subscriber: SubscriberModel) =>
{
    db.insert({...subscriber, createdAt: new Date(), updatedAt: new Date()});
}

export const updateSubscriber = (subscriber: SubscriberModel, newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  }) =>
{
    db.update({ _id: subscriber._id }, {...newSubscriberData,  createdAt: subscriber.createdAt, updatedAt: new Date()});
}

export const deleteSubscriber = (subscriber: SubscriberModel) =>
{
    db.remove({ _id: subscriber._id });    
}
