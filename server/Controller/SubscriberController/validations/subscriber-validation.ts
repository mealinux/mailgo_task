import { check, Match } from "meteor/check"
import { Meteor } from "meteor/meteor"
import SubscriberModel from "/imports/models/SubscriberModel";

export const subscriberValidationForAdd = (newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  }) => {
    check(newSubscriberData, {
        _id: Match.Maybe(String),
        email:  String,
        name: String,
        last_name: Match.Maybe(String),
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
    })


    if(! newSubscriberData.name || ! newSubscriberData.email){
        throw new Meteor.Error('Oops!', 'First Name and Email can\'t be empty')
    }
}

export const subscriberValidationForUpdate = (newSubscriberData: {
    name: string;
    last_name: string;
    email: string;
  }) => {
    check(newSubscriberData, {
        _id: Match.Maybe(String),
        email:  String,
        name: String,
        last_name: Match.Maybe(String),
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
    })


    if(! newSubscriberData.name || ! newSubscriberData.email){
        throw new Meteor.Error('Oops!', 'First Name and Email can\'t be empty')
    }
}

export const subscriberValidationForDelete = (subscriber: SubscriberModel) => {
    check(subscriber, {
        _id: String,
        email:  Match.Maybe(String),
        name: Match.Maybe(String),
        last_name: Match.Maybe(String),
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
    })
}