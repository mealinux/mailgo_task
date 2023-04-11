import { DataTableEnum } from "/imports/ui/constants/DataTableEnum";
import { CategoriesCollection } from "/imports/api/categories";
import CategoryModel from "/imports/models/CategoryModel";
import { Filter } from "../helpers/Filters";


const db = CategoriesCollection;


export const getCategory = (id?: number) =>
{
    
}

export const getCategories = (offset: number = 0, filters?: {dateRange? : Array<Date>, text?: string, limit?: boolean}) =>
{    
    const filteredData = Filter(filters);

    const filterlimit = filters?.limit ? { limit:  DataTableEnum.LIMIT} : {};
    
    const data = db.find(filteredData, {skip: offset, filterlimit, sort: ['createdAt', 'desc']}).fetch();
        
    const totalCount = db.find(filteredData).count();

    return { data, totalCount };
}


export const addCategory = (category: CategoryModel) =>
{
    db.insert({...category, createdAt: new Date(), updatedAt: new Date()});
}

export const updateCategory = (category: CategoryModel, newCategoryData: {
    name: string;
    description: string;
  }) =>
{
    db.update({ _id: category._id }, {...newCategoryData,  createdAt: category.createdAt, updatedAt: new Date()});
}

export const deleteCategory = (category: CategoryModel) =>
{
    db.remove({ _id: category._id });
}
