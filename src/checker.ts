
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import * as events from "events";
import * as schedule from "node-schedule";



const adapter = new FileSync(__dirname + '/../apps.json');
const appsConfig = lowdb(adapter);


export class Checker extends events.EventEmitter {
    Apps: CheckForUpdatesData[];

    //ScheduleEventEmitter = new events.EventEmitter();
    ScheduleCheckState: boolean;
    ScheduleCheckObject: any;

    constructor() {
        super();
        this.Apps = [];
        
        

        // events.EventEmitter.call(this);
        //this.ScheduleEventEmitter.on('check',(data)=>{return data});
    }

    public async check() {
        return await this.checkForUpdates(this.Apps);
    }

    public setSchedule(state: Boolean, time = '') {
        this.scheduleCheckForUpdates(state, time);
    }

    public init(settings) {
        let data = appsConfig.get('apps').value();
        for (let i in data) {///TODO if files don't exist don't load the module and throw error for user
            this.Apps.push(new CheckForUpdatesData(data[i].folder, data[i].file, `./apps/${data[i].folder}/${data[i].file}`));
        }
    }

    // ------------------ Private ------------------
    private async scheduleCheckForUpdates(state: Boolean, time = '') {
        if (state == true) {
            if (this.ScheduleCheckObject == null) {
                //let checkFunc = this.check;
                this.ScheduleCheckObject = schedule.scheduleJob(time, async ()=>
                 {//'* */60 * * * *'
                    try {
                        let appData = await this.check();
                        this.emit('check', appData);
                        console.log('run schedule');
                    } catch (err) {
                        console.log(err.message);
                    }
                    // this.emit('check')
                    //this.ScheduleEventEmitter.emit('check');
                });
            }
        } else {// appSchedule should be null
            if (this.ScheduleCheckObject != null) {
                this.ScheduleCheckObject.cancel();
                this.ScheduleCheckObject = null;

            }
        }
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

    private setupApp() {

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