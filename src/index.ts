import * as schedule from "node-schedule";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync(__dirname + '/../apps.json');
const appsConfig = lowdb(adapter);

export async function check() {
    let data = appsConfig.get('apps').value();
    checkForUpdates(data);
} 

var UpdateCheck = schedule.scheduleJob('* */60 * * * *', function () {//get cmc data every hour(for 30 minutes * */30 * * * *)
    // get_cmc_data();
});//schedule

async function checkForUpdates(data: checkForUpdatesData) {//check function
    //loop through array
    let updateCheck = [];
    for (let i in data) {
        try {
            let app = require(`./apps/${data[i].folder}/${data[i].file}`);//load app
            let checkResponse = await app.run();
            console.log("avc");
        } catch (err) {
            console.log(err.message);
        }
    }
}

interface checkForUpdatesData {
    folder: string,
    file: string,
    userSettings: Object[]
}