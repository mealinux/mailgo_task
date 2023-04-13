import { Meteor } from "meteor/meteor"
import MailModel from "/imports/models/system/MailModel"
import { SendInfoMail, SendMailForSubscription } from "../methods/SendMail";
import CampaignModel from "/imports/models/CampaignModel";

export class MailController {

    initConfig = () => {
        process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
    }

    mailOperations = () => {

        Meteor.methods({
            async 'send-subscription-mail' (maildata: MailModel, selectedCampaign: CampaignModel){
                
                await SendMailForSubscription(maildata, selectedCampaign)
            },

            async 'send-info-mail' (maildata: MailModel){
                
                await SendInfoMail(maildata)
            }
        })
    }


}