// let util = require("./util.js");
var schedule = require('node-schedule');

// let nodeApp = require("./apps/node.js");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./apps/apps.json');
const appsConfig = low(adapter);

const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    check: check
}

async function check() {
    let data = appsConfig.get('apps').value();
    checkForUpdates(data);
}

var UpdateCheck = schedule.scheduleJob('* */60 * * * *', function () {//get cmc data every 1 minute(for 30 seconds */30 * * * * *)
    // get_cmc_data();
});//schedule

async function checkForUpdates(data) {//check function
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

// async function execcheckForUpdates(data) {

// }