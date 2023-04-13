import { Meteor } from "meteor/meteor";
import { CampaignSubscriberHashCollection } from "/imports/api/campaign_subscriber_hash"
import { CampaignCollection } from "/imports/api/campaigns";
import { SubscriberClickCollection } from "/imports/api/subscriber_click_actions";
import { TimesTamp } from '../../../helpers/TimesTamp'




const CampaignSubscriberHashDB = CampaignSubscriberHashCollection;
const CampaignDB = CampaignCollection;

const  SubscriberClickRelationDB = SubscriberClickCollection;






export const CampaignVerification = (props: {hash: string}) =>{
      
        
    const campaignSubscriberRelation = CampaignSubscriberHashDB.findOne({ hash: props.hash });

    if(! campaignSubscriberRelation){
        throw new Meteor.Error('function CampaignVerification => error');
    }

    const campaign = CampaignDB.findOne({ _id:  campaignSubscriberRelation!.campaign_id})
    
    SubscriberClickRelationDB.insert({ subscriber_id: campaignSubscriberRelation!.subscriber_id, campaign_id: campaign!._id, ...TimesTamp()})
        
    return { targetUrl: campaign!.target };
}