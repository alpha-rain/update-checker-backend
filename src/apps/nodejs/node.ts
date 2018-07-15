import * as util from "util";
import * as cheerio from "cheerio";
import * as requestCallback from "request";

import * as appUtil from "../../util";

let request = util.promisify(requestCallback);
let config = require('./config.json');

export function init(setting) {
    //check if version changed
    
    //set os version
}

export function version(){
    
}

export async function run(settings){
    let osInfo = appUtil.osInfo();
    let iv = await installedVersion("wow");//setting.installed check current ver5sion

    let ov = await onlineVersion("wow");//check latest version, LTS or current

    let checkResult = {
        updateAvailable: false,
        updateLink: "",
        errors: false,
        errorText: ""
    }

    if(combine(iv, ov.current) == true){
        checkResult.updateAvailable = false;
        return checkResult;
    } else {
        console.log('qwe');
        //get update link
    }
}

async function installedVersion(setting) {
    ///TODO: check for error if cmd does not work
    let versionText = await appUtil.cmd("node -v");
    let version = versionExtraction(versionText.stdout);

    return version;
}

async function onlineVersion(setting) {
    let options = {
        uri: `https://nodejs.org/en/`,
        method: 'GET'
    };
    let response = await request(options);
    let $ = cheerio.load(response.body);
    let versionRaw: string[] = [];
    $('.home-downloadblock').each(function (i, elem) {
        versionRaw.push($(this).find('a').attr('title'));
    });

    let version = {
        LTS:versionExtraction(versionRaw[0]),
        current:versionExtraction(versionRaw[1])
    };

    return version;
}

async function latestVersion(setting) {

}

//until
function versionExtraction(version) {
    let regex = /(\d+).(\d+).(\d+)/;
    let result = version.match(regex);
    let responce = {
        major:result[1],
        minor:result[2],
        patch:result[3]
    }

    return responce;
}

function combine(v1,v2) {
    let v1Text = Number(v1.major) + Number(v1.minor) + Number(v1.patch);
    let v2Text = Number(v2.major) + Number(v2.minor) + Number(v2.patch);
    
    return v1Text == v2Text;
}