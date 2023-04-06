import { Meteor } from "meteor/meteor";
import { createUser } from "/server/Repositories/UserRepository";

export class UserController
{
    init(){
        Meteor.methods({
            'create_user' (user: any) {
                
                createUser(user);
            }
        });
    }
}