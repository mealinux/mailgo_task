
import { CampaignController } from "./CampaignController/CampaignController";
import { CategoryController } from "./CategoryController/CategoryController";
import { UserController } from "./UserController/UserController";
import { SubscriberController } from "./SubscriberController/SubscriberController";

export const ControllerService = () => {
    new CategoryController().init();
    new CampaignController().init();
    new UserController().init();
    new SubscriberController().init();
}