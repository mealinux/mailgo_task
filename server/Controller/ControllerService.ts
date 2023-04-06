import { Meteor } from "meteor/meteor";
import { CampaignController } from "./CampaignController/CampaignController";
import { CategoryController } from "./CategoryController/CategoryController";
import { SubscriberController } from "./SubscriberController/SubscriberController";
import { UserController } from "./UserController/UserController";
import { createUser } from "../Repositories/UserRepository";

export const ControllerService = () => {
    new CategoryController().init();
    new CampaignController().init();
    new UserController().init();
    new SubscriberController().init();
}