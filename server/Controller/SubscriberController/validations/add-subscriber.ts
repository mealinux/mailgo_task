import { check, Match } from "meteor/check"
import SubscriberModel from "/imports/models/SubscriberModel"
import { Meteor } from "meteor/meteor"

export const addSubscriberValidation = (subscriber: SubscriberModel) => {
    check(subscriber, {
        _id: Match.Maybe(Object),
        email:  String,
        name: String,
        last_name: Match.Maybe(String),
        created_at: Match.Maybe(String),
        updated_at: Match.Maybe(String),})


    if(! subscriber.name || ! subscriber.email){
        throw new Meteor.Error('Oops!', 'First Name and Email can\'t be empty')
    }
}