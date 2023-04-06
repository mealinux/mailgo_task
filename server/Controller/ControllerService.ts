import { CategoryController } from "./CategoryController/CategoryController";

export const ControllerService = () => {
    new CategoryController().init()
}