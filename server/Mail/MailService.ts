import { MailController } from "./Controller/MailController"



export const MailService = () => {
    new MailController().initConfig()
    new MailController().mailOperations()
}