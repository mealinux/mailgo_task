import { SubscribersCollection } from "/imports/api/subscribers"
import { TimesTamp } from "/server/helpers/TimesTamp";



const SubscribersDB = SubscribersCollection;



/* const REDIS_URL = Meteor.settings.private.REDIS_URL;
const importQueue = new Queue('import-queue', REDIS_URL); */



export const ImportFile = async (fileExtension: string, fileOutput: any) => {

    if(fileExtension != 'csv'){
        await ExcelImport(fileOutput)
    }else{
        await CsvImport(fileOutput)
    }
}



const ExcelImport = async (fileOutput: any) => {

    const sheets = fileOutput.Sheets.Sheet1;

    let counter = 1;
    while(counter <= ((Object.keys(sheets).length - 2) / 3)){
       const newSubscriber = `${sheets["A"+counter].v},${sheets["B"+counter].v},${sheets["C"+counter].v}`

        if(newSubscriber){
            await addToDatabase(newSubscriber);
        } 

        counter++;
    }

    /* await startQueue(); */
}



const CsvImport = async (fileOutput: string) => {

    const splittedText =  fileOutput.slice(fileOutput.indexOf("\n")).split("\n");

    let counter = 0;
    while(counter < splittedText.length){

        const newSubscriber = splittedText[counter].replace(/^(?:"|[!@#$%^&*()+\=[\]{}|;':",.-_<>?/]+\s*)|(\s*[!@#$%^&*()+\=[\]{}|;':",.-_<>?/]+)$/g, '')

        if(newSubscriber){
            await addToDatabase(newSubscriber);
        }

        counter++;
    }

    /* await startQueue(); */
}







 const addToDatabase = async (data: any) =>{
    const info = data.split(',');

    await SubscribersDB.insertAsync({ name:  info[0] ?? '', last_name: info[1] ?? '', email: info[2] ?? '', state: 1, ...TimesTamp()})
}







/* const startQueue = async () => {
    console.log(444444);
    importQueue.process(async (job: any) => {
        console.log(555555);
        const data = job.data;
        console.log('queue started');
      
        await addNewSubscriber(data);
        await job.completed();
    }).catch((e) => {
        console.log(e);
    });
}
async function addToTextQueue(data: any) {
    console.log(2222222);
    return new Promise((resolve, reject) => {
        console.log(333333);
        importQueue.add(data)
        .then((job)=>{
            resolve(job);
        })
        .catch(err => {
          reject(err);
        });
    });
  } */