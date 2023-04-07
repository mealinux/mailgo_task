import { Meteor } from 'meteor/meteor';
import { ControllerService } from './Controller/ControllerService';
import { db } from 'imports/api/subscribers.js';
import { getSubscribers } from './Repositories/SubscriberRepository';

Meteor.startup(() => {
   ControllerService();
});
