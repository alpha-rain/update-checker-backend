import { Checker } from "./checker";
import * as events from "events";
import * as schedule from "node-schedule";

let checker = new Checker();
// checker.init('sd');
//run.check();
// run.setSchedule(true, '* * * * *');
export class Run extends events.EventEmitter {
    

    ScheduleCheckState: boolean;
    ScheduleCheckObject: any;

    constructor(){
        super();
        checker.init('s');

        this.ScheduleCheckState = false;
        this.ScheduleCheckObject = null;
    }

    public check() {
        return checker.check();
    }

    public setSchedule(state: Boolean, time = '') {
        this.scheduleCheckForUpdates(state, time);
    }
    
    private async scheduleCheckForUpdates(state: Boolean, time = '') {
        if (state == true) {
            if (this.ScheduleCheckObject == null) {
                let checkFunc = this.check;
                this.ScheduleCheckObject = schedule.scheduleJob(time, async () =>
                 {//'* */60 * * * *'
                    try {
                        let appData = await checker.check();
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
}
// run.on('check',(data)=>{
//     console.log('data');
// })