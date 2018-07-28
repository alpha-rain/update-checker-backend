// let util = require("./util.js");
// let nodeApp = require("./apps/node.js");
// import * as main from ".";
import { Run } from "./index";
// let main = require('./index.js');

let run = new Run();
run.check();
run.setSchedule(true, '* * * * *');
run.on('check',(data)=>{
    console.log('data');
})

// test();
// async function test(){
// let data = await util.cmd("node -v");
// let data2 = await util.cmd("C:/opencv/build/x64/vc15/bin/opencv_version.exe");
// nodeApp.run("wow");
// console.log("wow");
// }