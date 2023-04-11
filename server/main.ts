import { Meteor } from 'meteor/meteor';
import { ControllerService } from './Controller/ControllerService';
import { MailService } from './Mail/MailService';

Meteor.startup(() => {
   MailService();

   ControllerService();
});
