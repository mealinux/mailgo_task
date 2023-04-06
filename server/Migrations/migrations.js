import {Migrations} from 'meteor/percolate:migrations';

import { Mongo } from 'meteor/mongo';

export const MigrateUp = () =>{
    /* const Lists = new Mongo.Collection('mailgoo'); */



   /*  Migrations.add({
        version: 1,
        name: 'category',
        up: function() {
            Lists.insert({name: 'aliiiiiiii'});
        },
        down: function() { 
            Lists.update({}, {$unset: {age: null}}, {multi: true});
        }
    }); */

    Migrations.unlock();
    Migrations.migrateTo('latest');

}