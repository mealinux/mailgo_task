import SubscriberModel from "/imports/models/SubscriberModel";
import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { SubscribersCollection } from "/imports/api/subscribers";
import { Filter } from "../Controller/SubscriberController/methods/Filters";


const db = SubscribersCollection;


export const getSubscriber = (id?: number) =>
{
    
}

export const getSubscribers = (offset: number, filters?: {dateRange : Array<Date>, text: string}) =>
{    
    const filteredData = Filter(filters);
    
    const data = db.find(filteredData, {skip: offset, limit: DataTableEnum.LIMIT, sort: ['createdAt', 'desc']}).fetch();
        
    const totalCount = db.find(filteredData).count();

    return { data, totalCount };
}


export const addSubscriber = (subscriber?: SubscriberModel) =>
{
    db.insert({...subscriber, createdAt: new Date(), updatedAt: new Date()});
}

export const updateSubscriber = (id?: number, data?: any) =>
{
    
}

export const deleteSubscriber = (id?: number) =>
{
    
}
