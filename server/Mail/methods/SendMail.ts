import { Email } from "meteor/email"
import MailModel from "/imports/models/system/MailModel"
import { Meteor } from "meteor/meteor"
import { CampaignSubscriberHashCollection } from "/imports/api/campaign_subscriber_hash";

import { UnsubscriberHashCollection } from "/imports/api/unsubsciber_hash";
import { MailSendInfoCollection } from "/imports/api/mail_send_info_actions";
import { getSubscribers } from "/server/Repositories/SubscriberRepository";
import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";

import Queue from 'bull';

const REDIS_URL = Meteor.settings.private.REDIS_URL;

const mailQueue = new Queue('mail-queue', REDIS_URL);

export const CampaignSubscriberHashDB = CampaignSubscriberHashCollection;

export const UnsubscriberHashDB = UnsubscriberHashCollection;

export const MailSendInfoDB = MailSendInfoCollection;



export const SendInfoMail = (mailData: MailModel,  subscriberId?: string)=>{

    SendMail(mailData)

    MailSendInfoDB.insert({ subscriber_id: subscriberId, subject: mailData.subject, content: mailData.content })
}



export const SendMailForSubscription = async (mailData: MailModel) => {

    const hashForUnsubcribe = CreateHash();
    const hashCampaign = CreateHash()

    const subscriptionContent = MailPrepareForSubscription(mailData, hashCampaign, hashForUnsubcribe);

    let subscribers = getSubscribers();

    let currentTotalSubscribers = 0;

    while(subscribers.data.length > 0){
        
        let counterLimit = 0;
        while(counterLimit < subscribers.data.length){
            mailData.content = subscriptionContent;
            mailData.toEmail = subscribers.data[counterLimit].email;
            
            await mailQueue.add(mailData); 
            await new Promise((resolve) => setTimeout(resolve, 750));

            CampaignSubscriberHashDB.insert({ subscriber_id: subscribers.data[counterLimit]._id, target: mailData.target, hash: hashCampaign })
    
            UnsubscriberHashDB.insert({ subscriber_id: subscribers.data[counterLimit]._id, hash: hashForUnsubcribe })
            
            counterLimit++;
        }

        currentTotalSubscribers += DataTableEnum.LIMIT;

        if(counterLimit){
            subscribers = getSubscribers(currentTotalSubscribers);
        }
    }
 
    startQueue();
}


const startQueue = () => {
    mailQueue.process(async (job: any) => {
        console.log(job.data);
        
        const data = job.data;
    
        await SendMail(data);

        await job.completed();
    });
}




const SendMail = async (mailData: MailModel)=>{

    const sender = Meteor.settings.private.SENDER;

    Email.sendAsync({ to: mailData?.toEmail, from: sender, subject: mailData?.subject,  html: mailData.content}).catch(() => {
        new Meteor.Error('Whoops!, There is an error');
    }).then((e)=>console.log(e));
    
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
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!*()_+~|}{[]\></-=';
    var charactersLength = characters.length;
    for ( var i = 0; i < 75; i++ ) {
        hash += characters.charAt(Math.floor(Math.random() * charactersLength));
    }


    return hash;
}