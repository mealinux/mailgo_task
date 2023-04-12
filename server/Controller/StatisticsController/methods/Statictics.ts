import { MailSendCollection } from "/imports/api/mail_send_actions";
import { SubscriberClickCollection } from "/imports/api/subscriber_click_actions";
import { SubscribersCollection } from "/imports/api/subscribers"
import { Filter } from "/server/helpers/Filters";


const SubscribersDB = SubscribersCollection
const MailSendDB = MailSendCollection;
const SubscriberClickDB= SubscriberClickCollection;






export const TotalSubscribers = (dateRange? : Array<Date>) => {
    const dates = Filter({dateRange});
    

    const totalSubscribers = SubscribersDB.find(dates).count();
    

    return totalSubscribers;
}






export const TotalUnsubscribers = (dateRange? : Array<Date>) => {

    const filters = Filter({dateRange}, [0]);

    const totalUnsubscribers = SubscribersDB.find(filters).count();
    
    return totalUnsubscribers;

}






export const TotalSentMail = (dateRange? : Array<Date>) => {

    const dates = Filter({dateRange});

    const totalSentMail = MailSendDB.find(dates).count();


    return totalSentMail;

}







export const TotalClickedCampaign = (dateRange? : Array<Date>) => {

    const dates = Filter({dateRange});

    const totalClickCampaign = SubscriberClickDB.find(dates).count();


    return totalClickCampaign;

}


