import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const db = new Mongo.Collection("subscribers");