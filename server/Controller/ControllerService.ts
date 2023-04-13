
import { CampaignController } from "./CampaignController/CampaignController";
import { CategoryController } from "./CategoryController/CategoryController";
import { UserController } from "./UserController/UserController";
import { SubscriberController } from "./SubscriberController/SubscriberController";
import { VerificationController } from "./VerificationController/VerificationController";
import { StaticticsController } from "./StatisticsController/StaticticsController";
import { ImportController } from "./ImportController/ImportController";

export const ControllerService = () => {
    new CategoryController().init();
    new CampaignController().init();
    new UserController().init();
    new SubscriberController().init();
    new VerificationController().init();
    new StaticticsController().init()
    new ImportController().init();
}