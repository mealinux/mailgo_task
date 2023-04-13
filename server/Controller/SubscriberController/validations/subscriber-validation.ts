import { check, Match } from "meteor/check"
import { Meteor } from "meteor/meteor"

export const subscriberValidationForAdd = (newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  }) => {
    check(newSubscriberData, {
        email:  String,
        name: String,
        state: Number,
        last_name: Match.Maybe(String),
    })


    if(! newSubscriberData.name || ! newSubscriberData.email){
        throw new Meteor.Error('function subscriberValidationForAdd => error', 'First Name and Email can\'t be empty')
    }
}

export const subscriberValidationForUpdate = (newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  }) => {
    check(newSubscriberData, {
        email:  String,
        name: String,
        state: Match.Maybe(Number),
        last_name: Match.Maybe(String),
    })


    if(! newSubscriberData.name || ! newSubscriberData.email){
        throw new Meteor.Error('function subscriberValidationForUpdate => error', 'First Name and Email can\'t be empty')
    }
}

export const subscriberValidationForDelete = (subscriberId: string) => {
   
    
    check(subscriberId, String)
}