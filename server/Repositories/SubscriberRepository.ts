import { Mongo } from "meteor/mongo";
import SubscriberModel from "/imports/models/SubscriberModel";
import { Meteor } from "meteor/meteor";


export const db = new Mongo.Collection('subscribers');


export const getSubscriber = (id?: number) =>
{
    
}

export const getSubscribers = (index?: number, offset?: number) =>
{
    return db.find().fetch();
}


export const addSubscriber = (subscriber?: SubscriberModel) =>
{
    db.insert({...subscriber});
}

export const updateSubscriber = (id?: number, data?: any) =>
{
    
}

export const deleteSubscriber = (id?: number) =>
{
    
}