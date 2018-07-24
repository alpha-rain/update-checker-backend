import * as schedule from "node-schedule";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync(__dirname + '/../apps.json');
const appsConfig = lowdb(adapter);


//var UpdateCheck = schedule.scheduleJob('* */60 * * * *', function () {//get cmc data every hour(for 30 minutes * */30 * * * *)
    // get_cmc_data();
//});//schedule


export class Run {
Apps: CheckForUpdatesData[];

constructor() {
    this.Apps = [];
}


public async check() {
    //let data = appsConfig.get('apps').value();
    await this.checkForUpdates(this.Apps);
}

public init() {
    //let apps: CheckForUpdatesData[] = [];
    let data = appsConfig.get('apps').value();
    for (let i in data) {
        this.Apps.push(new CheckForUpdatesData(data[i].folder, data[i].file, `./apps/${data[i].folder}/${data[i].file}`));
    }
    //return apps;
    //console.log("done");
}

// function initData(appData){
//     return {

//     };
// }



private setupApp() {

}

private async checkForUpdates(data: CheckForUpdatesData[]) {//check function
    //loop through array
    // let updateCheckResponse = [];
    console.log("checkForUpdates");
    for (let i in data) {
        try {
            // let app = require(`./apps/${data[i].folder}/${data[i].file}`);//load app
            let checkResponse = await data[i].app.run();
            // console.log("avc");
        } catch (err) {
            console.log(err.message);
        }
    }
}

};

export class CheckForUpdatesData {
    folder: string;
    file: string;
    app: any;

    constructor(folder: string , file: string , app: string) {
        this.folder = folder;
        this.file = file;
        this.app = require(app);
    }
    
    // userSettings: Object[]
}