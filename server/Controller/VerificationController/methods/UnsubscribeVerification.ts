import { Meteor } from 'meteor/meteor';
import { TimesTampUpdatedAt } from '../../../helpers/TimesTamp'
import { UnsubscriberHashCollection } from '/imports/api/unsubsciber_hash'
import { SubscribersCollection } from '/imports/api/subscribers';


const UnsubscriberHashDB = UnsubscriberHashCollection;
const SubscriberStateDB = SubscribersCollection;


export const UnsubscribeVerification = (props: {hash: string}) => {
    
    const unsubscriberHash = UnsubscriberHashDB.findOne({ hash: props.hash });

    if(! unsubscriberHash){
        throw new Meteor.Error('Function UnsubscribeVerification => error');
    }

    SubscriberStateDB.update({ _id: unsubscriberHash!.subscriber_id }, { $set: {state: 0, ...TimesTampUpdatedAt()} });
    

    return { hash: props.hash }
}


export const UnsubscribdSuccess = (props: {hash: string}) => {
    
    
    const unsubscriberHashForSuccess = UnsubscriberHashDB.findOne({ hash: props.hash });
    
    if(! unsubscriberHashForSuccess){
        throw new Meteor.Error('Function UnsubscribdSuccess => error');
    }

    return true;
}