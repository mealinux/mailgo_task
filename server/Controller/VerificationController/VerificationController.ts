import { Meteor } from "meteor/meteor";
import { CampaignVerification } from "./methods/CampaignVerification";
import { UnsubscribdSuccess, UnsubscribeVerification } from "./methods/UnsubscribeVerification";

export class VerificationController
{
    init(){
        Meteor.methods({
            'campaign-verification' (hash: string) {
                
               const campaignVerification = CampaignVerification({hash});

               return campaignVerification;
            }
        });

        Meteor.methods({
            'unsubscribe-verification' (hash: string) {
                
               const unsubscribeVerification = UnsubscribeVerification({hash});

               return unsubscribeVerification;
            }
        });
        
        
        Meteor.methods({
            'unsubscribed-success'  (hash: string) {
                
               const unsubscribdSuccess =  UnsubscribdSuccess({hash});

               return unsubscribdSuccess;
            }
        });
    }
}