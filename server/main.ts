import { Meteor } from 'meteor/meteor';
import { ControllerService } from './Controller/ControllerService';

Meteor.startup(() => {
   ControllerService();
});
