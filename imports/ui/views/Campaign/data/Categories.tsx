import React, { Dispatch, SetStateAction } from "react";

import CategoryModel from "/imports/models/CategoryModel";
import { Select } from "@chakra-ui/react";

export const Categories = (props: {
  categories: Array<CategoryModel>;
  setSelectedCategoryId: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Select
      placeholder="Select Category"
      onChange={(event) => props.setSelectedCategoryId(event.target.value)}
    >
      {props.categories ? (
        props.categories.map((category: CategoryModel, index: number) => (
          <option value={category._id} key={index}>
            {category.name}
          </option>
        ))
      ) : (
        <></>
      )}
    </Select>
  );
};
