import { Meteor } from "meteor/meteor";
import SubscriberModel from "/imports/models/SubscriberModel";
import { addSubscriber, getSubscribers } from "/server/Repositories/SubscriberRepository";
import { addSubscriberValidation } from "./validations/add-subscriber";

export class SubscriberController
{
    init() {
        Meteor.methods({
            'add-subscriber' (subscriber: SubscriberModel) {
                addSubscriberValidation(subscriber);
               
                addSubscriber(subscriber);
            },
            'get-subscribers'  (offset: number, filters?:{dateRange: Array<Date>, text: string}) {
                    
                return getSubscribers(offset, filters);
            }
        })
    }
}