import { Meteor } from "meteor/meteor";
import SubscriberModel from "/imports/models/SubscriberModel";
import { addSubscriber, deleteSubscriber, getCampaignClickCountOfSubscriber, getCategoriesOfSubscriber, getMailCountOfSubscriber, getSubscribers, updateSubscriber } from "/server/Repositories/SubscriberRepository";
import { subscriberValidationForAdd, subscriberValidationForDelete, subscriberValidationForUpdate } from "./validations/subscriber-validation";

export class SubscriberController
{
    init() {
        Meteor.methods({
            'add-subscriber' (subscriber: SubscriberModel) {
                subscriber.state = 1;
                
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



            'delete-subscriber' (subscriberId: string) {
                subscriberValidationForDelete(subscriberId);

                deleteSubscriber(subscriberId);
            },



            'get-subscribers'  (offset?: number, state?: Array<number>, filters?:{dateRange?: Array<Date>, text?: string}) {
                
                return getSubscribers(offset, state, filters);
            },



            async 'get-subscriber-detail'  (subscriberId: string) {
                
                
                const campaignClickNumberOfSubscriber = await getCampaignClickCountOfSubscriber(subscriberId);
                const mailNumberOfSubscriber = await getMailCountOfSubscriber(subscriberId);
                const categoriesOfSubscriber = await getCategoriesOfSubscriber(subscriberId);



                return { campaignClickNumberOfSubscriber, mailNumberOfSubscriber, categoriesOfSubscriber };
            }
        })
    }



}