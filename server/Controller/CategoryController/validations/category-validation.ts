import { check, Match } from "meteor/check"
import { Meteor } from "meteor/meteor"
import CategoryModel from "/imports/models/CategoryModel";

export const categoryValidationForAdd = (newCategoryData: {
    name: string;
    description: string;
  }) => {
    check(newCategoryData, {
        _id: Match.Maybe(String),
        name:  String,
        description: Match.Maybe(String),
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
    })


    if(! newCategoryData.name){
        throw new Meteor.Error('Oops!', 'Category Name can\'t be empty')
    }
}

export const categoryValidationForUpdate = (newCategoryData: {
    name: string;
    description: string;
  }) => {
    check(newCategoryData, {
        _id: Match.Maybe(String),
        name:  String,
        description: Match.Maybe(String),
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
    })


    if(! newCategoryData.name){
        throw new Meteor.Error('Oops!', 'Category Name can\'t be empty')
    }
}

export const categoryValidationForDelete = (category: CategoryModel) => {
    check(category, {
        _id: String,
        name:  Match.Maybe(String),
        description: Match.Maybe(String),
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
    })
}