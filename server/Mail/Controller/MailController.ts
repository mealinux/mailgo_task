import { Meteor } from "meteor/meteor"
import MailModel from "/imports/models/system/MailModel"
import { SendInfoMail, SendMailForSubscription } from "../methods/SendMail";

export class MailController {

    initConfig = () => {
        process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
    }

    mailOperations = () => {

        Meteor.methods({
            'send-subscription-mail' (maildata: MailModel){
                
                SendMailForSubscription(maildata)
            },
            'send-info-mail' (maildata: MailModel, subscriberId: string){
                
                SendInfoMail(maildata, subscriberId)
            }
        })
    }


}