import { Accounts } from "meteor/accounts-base";
import { Mongo } from "meteor/mongo";
import UserModel from "/imports/models/UserModel";
import { Meteor } from "meteor/meteor";


//export const User = Meteor.collection('users');


export const getUser= (id?: number) =>
{
    
}

export const getUsers = (index?: number, offset?: number) =>
{
    
}


export const createUser = (user: any) =>
{
    console.log(342342342);
    
    Accounts.createUser({...user}, (error) => {
        console.log(error?.message);
        
    });
}

export const updateUser = (id?: number, data?: any) =>
{
    
}


export const deleteUser = (id?: number) =>
{
    
}