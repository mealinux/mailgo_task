import { Meteor } from "meteor/meteor";

export default interface UserModel {
  _id?: string;
  email: string;
  profile: Meteor.UserProfile;
  company_name?: string;
  created_at?: string;
  updated_at?: string;
}
