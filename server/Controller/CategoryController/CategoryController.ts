import { Meteor } from "meteor/meteor";
import { AddCategory } from "/server/Repositories/CategoryRepository";

export class CategoryController
{
    init(){
        Meteor.methods({
            'category'() {
                
                AddCategory();

                return 'sfsefsefs';
            }
          });
    }
}