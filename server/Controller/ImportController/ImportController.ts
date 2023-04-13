import { Meteor } from "meteor/meteor";
import { ImportFile } from "./methods/ImportFile";




export class ImportController {

  init() {
      Meteor.methods({
        async 'import-file' (fileExtension: string, fileOutput: any) {
            await ImportFile(fileExtension, fileOutput)    
        }
      });
  }
}