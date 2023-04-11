import { Meteor } from "meteor/meteor";
import { categoryValidationForAdd, categoryValidationForDelete, categoryValidationForUpdate } from "./validations/category-validation";
import CategoryModel from "/imports/models/CategoryModel";
import { addCategory, deleteCategory, getCategories, updateCategory } from "/server/Repositories/CategoryRepository";

export class CategoryController
{
    init() {
        Meteor.methods({
            'add-category' (category: CategoryModel) {
                categoryValidationForAdd(category);
               
                addCategory(category);
            },
            'update-category' (category: CategoryModel, newCategoryData: {
                name: string;
                description: string;
              }) {
                
                categoryValidationForUpdate(newCategoryData);
               
                updateCategory(category, newCategoryData);
            },
            'delete-category' (category: CategoryModel) {
                categoryValidationForDelete(category);
                    
                deleteCategory(category);
            },
            'get-categories'  (offset: number, filters?:{dateRange: Array<Date>, text: string}) {
                    
                return getCategories(offset, filters);
            }
        })
    }
}