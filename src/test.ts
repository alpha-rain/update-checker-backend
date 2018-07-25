// let util = require("./util.js");
// let nodeApp = require("./apps/node.js");
import { Run } from "./index";
// let main = require('./index.js');

let run = new Run();
run.init('sd');
run.check();

// test();
// async function test(){
// let data = await util.cmd("node -v");
// let data2 = await util.cmd("C:/opencv/build/x64/vc15/bin/opencv_version.exe");
// nodeApp.run("wow");
// console.log("wow");
// }