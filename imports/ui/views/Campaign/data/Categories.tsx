import React, { Dispatch, SetStateAction } from "react";

import CategoryModel from "/imports/models/CategoryModel";
import { Select } from "@chakra-ui/react";
import CampaignModel from "/imports/models/CampaignModel";

export const Categories = (props: {
  categories: Array<CategoryModel>;
  campaign: CampaignModel;
  setSelectedCategoryId: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Select
      placeholder="Select Category"
      onChange={(event) => props.setSelectedCategoryId(event.target.value)}
      defaultValue={props.campaign?.category?._id}
    >
      {props.categories ? (
        props.categories.map((category: CategoryModel, index: number) => {
          return (
            <option value={category._id} key={index}>
              {category.name}
            </option>
          );
        })
      ) : (
        <></>
      )}
    </Select>
  );
};
