import { check, Match } from "meteor/check"
import { Meteor } from "meteor/meteor"
import CampaignModel from "/imports/models/CampaignModel";

export const campaignValidationForAdd = (newCampaignData: {
    name: string;
    description?: string;
    target: string;
  }, categoryId: string) => {
    check(newCampaignData, {
        _id: Match.Maybe(String),
        name:  String,
        description: Match.Maybe(String),
        target: String,
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
    })

    check(categoryId, String)


    if(! newCampaignData.name || ! newCampaignData.target){
        throw new Meteor.Error('function campaignValidationForAdd => not found', 'Campaign Name and Target can\'t be empty')
    }

    if(! categoryId){
        throw new Meteor.Error('function campaignValidationForAdd => not found', 'Any category didn\'t select')
    }
}

export const campaignValidationForUpdate = (newCampaignData: {
    name: string;
    description?: string;
    target: string;
  }, categoryId: string) => {
    check(newCampaignData, {
        name:  String,
        description: Match.Maybe(String),
        target: String,
    })

    check(categoryId, String)

    if(! newCampaignData.name || ! newCampaignData.target){
        throw new Meteor.Error('function campaignValidationForUpdate => not found', 'Campaign Name and Target can\'t be empty')
    }

    if(! categoryId){
        throw new Meteor.Error('function campaignValidationForUpdate => not found', 'Any category didn\'t select')
    }
}

export const campaignValidationForDelete = (campaign: CampaignModel) => {
    check(campaign, {
        _id: String,
        name:  Match.Maybe(String),
        description: Match.Maybe(String),
        target: Match.Maybe(String),
        createdAt: Match.Maybe(Date),
        updatedAt: Match.Maybe(Date),
        category: {
            _id: String,
            name: String
        }
    })
}