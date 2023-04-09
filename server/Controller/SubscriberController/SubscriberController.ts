import { Meteor } from "meteor/meteor";
import SubscriberModel from "/imports/models/SubscriberModel";
import { addSubscriber, deleteSubscriber, getSubscribers, updateSubscriber } from "/server/Repositories/SubscriberRepository";
import { subscriberValidationForAdd, subscriberValidationForDelete, subscriberValidationForUpdate } from "./validations/subscriber-validation";

export class SubscriberController
{
    init() {
        Meteor.methods({
            'add-subscriber' (subscriber: SubscriberModel) {
                subscriberValidationForAdd(subscriber);
               
                addSubscriber(subscriber);
            },
            'update-subscriber' (subscriber: SubscriberModel, newSubscriberData: {
                name: string;
                last_name: string;
                email: string;
              }) {
                
                subscriberValidationForUpdate(newSubscriberData);
               
                updateSubscriber(subscriber, newSubscriberData);
            },
            'delete-subscriber' (subscriber: SubscriberModel) {
                subscriberValidationForDelete(subscriber);
                    console.log(subscriber);
                    
                deleteSubscriber(subscriber);
            },
            'get-subscribers'  (offset: number, filters?:{dateRange: Array<Date>, text: string}) {
                    
                return getSubscribers(offset, filters);
            }
        })
    }
}