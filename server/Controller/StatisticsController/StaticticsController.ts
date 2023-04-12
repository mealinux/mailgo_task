import { Meteor } from "meteor/meteor";
import { TotalClickedCampaign, TotalSentMail, TotalSubscribers, TotalUnsubscribers } from "./methods/Statictics";




export class StaticticsController {

  init() {
      Meteor.methods({
        'statistics' (dateRange?: Array<Date>) {
            
          const totalSubscribers = TotalSubscribers(dateRange);
          const totalUnsubscribers= TotalUnsubscribers(dateRange);
          const totalSentMail = TotalSentMail(dateRange);
          const totalClickedCampaign = TotalClickedCampaign(dateRange);
          
          return { totalSubscribers,  totalUnsubscribers, totalSentMail, totalClickedCampaign }
        }
      });
  }
}
