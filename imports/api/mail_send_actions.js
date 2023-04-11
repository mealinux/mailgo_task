import { Mongo } from 'meteor/mongo';

export const MailSendCollection = new Mongo.Collection('mail_send_actions');