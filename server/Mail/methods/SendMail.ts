import { Email } from "meteor/email"
import MailModel from "/imports/models/system/MailModel"
import { Meteor } from "meteor/meteor"
import { CampaignSubscriberHashCollection } from "/imports/api/campaign_subscriber_hash";

import { UnsubscriberHashCollection } from "/imports/api/unsubsciber_hash";
import { MailSendInfoCollection } from "/imports/api/mail_send_info_actions";
import { getSubscribers } from "/server/Repositories/SubscriberRepository";
import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";

import Queue from 'bull';
import { MailSendCollection } from "/imports/api/mail_send_actions";
import { CampaignCollection } from "/imports/api/campaigns";


import { TimesTamp } from '../../helpers/TimesTamp'





const REDIS_URL = Meteor.settings.private.REDIS_URL;

const mailQueue = new Queue('mail-queue', REDIS_URL);

export const CampaignSubscriberHashDB = CampaignSubscriberHashCollection;

export const UnsubscriberHashDB = UnsubscriberHashCollection;

export const MailSendInfoDB = MailSendInfoCollection;

export const MailSendDB = MailSendCollection;

export const CampaignDB = CampaignCollection;






export const SendInfoMail = (mailData: MailModel,  subscriberId?: string)=>{

    SendMail(mailData)

    MailSendInfoDB.insert({ subscriber_id: subscriberId, subject: mailData.subject, content: mailData.content })
}






export const SendMailForSubscription = async (mailData: MailModel, selectedCampaign: any) => {
    
    let subscribers = getSubscribers(0, [1]);

    const campaign =  CampaignDB.findOne({ _id: selectedCampaign._id});
    
    let currentTotalSubscribers = 0;

    while(subscribers.data.length > 0){
        
        let counterLimit = 0;
        while(counterLimit < subscribers.data.length){

            const hashForUnsubcribe = CreateHash();
            const hashCampaign = CreateHash()
        
            const subscriptionContent = MailPrepareForSubscription(mailData, hashCampaign, hashForUnsubcribe);

            const newMailContent = {
                subject: mailData.subject,
                content: subscriptionContent,
                toEmail: subscribers.data[counterLimit].email,
                target: campaign!.target,
            }
           
            await addToMailQueue(newMailContent, subscribers.data[counterLimit]._id, campaign!._id, hashCampaign, hashForUnsubcribe);
            
            counterLimit++;
        }
       
        currentTotalSubscribers += DataTableEnum.LIMIT;

        if(counterLimit){
            subscribers = getSubscribers(currentTotalSubscribers, [1]);
        }
    }

    await startQueue();
}






async function addToMailQueue(mailData: any, subscriberId: string, campaignId: string, hashCampaign: string, hashForUnsubcribe: string) {
    return new Promise((resolve, reject) => {
      mailQueue.add(mailData)
        .then(job => {

            CampaignSubscriberHashDB.insert({ subscriber_id: subscriberId, campaign_id: campaignId, hash: hashCampaign, ...TimesTamp() })

            UnsubscriberHashDB.insert({ subscriber_id: subscriberId, hash: hashForUnsubcribe, ...TimesTamp() })

            MailSendDB.insert({ subscriber_id: subscriberId,  campaign_id: campaignId,  ...TimesTamp() })

            resolve(job);
        })
        .catch(err => {
          reject(err);
        });
    });
  }






const startQueue = async () => {
    mailQueue.process(async (job: any) => {
        
        const data = job.data;
    
        await SendMail(data);

        await job.completed();
    }).catch((e) => {
        console.log(e);
    });
}





const SendMail = async (mailData: MailModel) => {

    const sender = Meteor.settings.private.SENDER;
    
    try {
        await Email.sendAsync({ to: mailData?.toEmail, from: sender, subject: mailData?.subject,  html: mailData.content});
    } catch (error) {
        console.log(error);
    }
}






const MailPrepareForSubscription = (mailData: MailModel, hashCampaign: string, hashForUnsubcribe: string) => {

    const location = Meteor.settings.private.BASE_URL;

    const URLWithHashForCampaign = location +'/verify/'+ hashCampaign;
    const URLWithHashForUnsubscription =  location +'/unsubscribe/'+ hashForUnsubcribe;

    return mailData.content+ '<br /><br />' + '<a href="'+URLWithHashForCampaign+'" target="_blank" style="font-size: 15pt; ">See The Campaign</a>' + '<br /><br />' + '<a href="'+URLWithHashForUnsubscription+'" target="_blank">Unsubscribe</a>' + '<br /><br />'+ 'Mailgo';
}





// create a hash
const CreateHash = () =>{

    let hash = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!*()_+~|}{[]><-=';
    var charactersLength = characters.length;
    for ( var i = 0; i < 75; i++ ) {
        hash += characters.charAt(Math.floor(Math.random() * charactersLength));
    }


    return hash;
}