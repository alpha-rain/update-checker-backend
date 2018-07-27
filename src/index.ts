import * as schedule from "node-schedule";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import * as events from "events";

const adapter = new FileSync(__dirname + '/../apps.json');
const appsConfig = lowdb(adapter);


//var UpdateCheck = schedule.scheduleJob('* */60 * * * *', function () {//get cmc data every hour(for 30 minutes * */30 * * * *)
// get_cmc_data();
//});//schedule

export class Run {
    Apps: CheckForUpdatesData[];

    ScheduleEventEmitter = new events.EventEmitter();
    ScheduleCheckState: boolean;
    ScheduleCheckObject: any;

    constructor() {
        this.Apps = [];

        this.ScheduleCheckState = false;
        this.ScheduleCheckObject = null;
    }

    public async check() {
        await this.checkForUpdates(this.Apps);
    }

    public init(settings) {
        let data = appsConfig.get('apps').value();
        for (let i in data) {///TODO if files don't exist don't load the module and throw error for user
            this.Apps.push(new CheckForUpdatesData(data[i].folder, data[i].file, `./apps/${data[i].folder}/${data[i].file}`));
        }
    }

    // ------------------ Private ------------------
    private scheduleCheckForUpdates(state: Boolean, time = '', data: CheckForUpdatesData[] = []) {
        if (state == true) {
            if (this.ScheduleCheckObject == null) {
                this.ScheduleCheckObject = schedule.scheduleJob(time, async function () {//'* */60 * * * *'
                    this.checkForUpdates(data);
                });
            }
        } else {// appSchedule should be null
            if (this.ScheduleCheckObject != null) {
                this.ScheduleCheckObject.cancel();
                this.ScheduleCheckObject = null;

            }
        }
    }

    private setupApp() {

    }

    private async checkForUpdates(data: CheckForUpdatesData[]) {//check function
        //loop through array
        let appResults: object[] = [];
        for (let i in data) {
            try {
                let checkResponse = await data[i].app.run();//load app

                if (checkResponse != undefined) {
                    appResults.push(checkResponse);
                }
                console.log('wew');
            } catch (err) {
                console.log(err.message);
            }
        }
        return appResults;
    }

};



export class CheckForUpdatesData {
    folder: string;
    file: string;
    app: any;

    constructor(folder: string, file: string, app: string) {
        this.folder = folder;
        this.file = file;
        this.app = require(app);
    }
}