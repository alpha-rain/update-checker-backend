import * as util from "util";
import * as cheerio from "cheerio";
import * as requestCallback from "request";

import * as appUtil from "../../util";

let request = util.promisify(requestCallback);
let config = require('./config.json');
let userConfig = require('./userConfig.json');

export async function run(settings) {
    let osInfo = appUtil.osInfo();
    let iv: any = await installedVersion("wow");//setting.installed check current ver5sion

    let ov: any = await onlineVersion("wow");//check latest version, LTS or current

    let checkResult = {
        updateAvailable: false,
        updateLink: "",
        errors: false,
        errorText: ""
    }

    if (combine(iv, ov[iv.m0][0].version) == true) {
        checkResult.updateAvailable = false;
        return checkResult;
    } else {
        //console.log(`nodejs current version: ${iv.m0}.${iv.m0}.${iv.m0}.${iv.m3}, latest version ${ov.current.major}.${ov.current.minor}.${ov.current.patch}`);
        //get update link
        checkResult.updateAvailable = true;
        return checkResult;
    }
}

async function installedVersion(setting) {
    ///TODO: check for error if cmd does not work
    let versionText = await appUtil.cmd(`${userConfig.userSettings.options.installLocation}/x64/vc15/bin/opencv_version.exe`);
    let version = cleanData(versionText.stdout,'version');

    return version;
}

async function onlineVersion(setting) {
    let options = {
        uri: `https://opencv.org/releases.html`,
        method: 'GET'
    };
    let response = await request(options);
    let $ = cheerio.load(response.body);
    let versionRaw: object = {};//object[] = [];
    $('div[class=release-col-1]').each(function (i, elem) {
        //console.log($(this).text())// 'div[class=release-name]'
        let data:any = {
            version: cleanData($(this).find('div[class=release-tag]').text(), 'version')
            //$(this).find('div[class=release-name]').text()
            , date: cleanData($(this).find('div[class=release-date]').text(), 'date')
            // ,tag:$(this).find('div[class=release-tag] a').attr('href')
        }
        if(versionRaw[data.version.m0] == undefined){
            versionRaw[data.version.m0] = [];
        }
        versionRaw[`${data.version.m0}`].push(data);
    });

    // let version = {
    //     //LTS: versionExtraction(versionRaw[0]),
    //     //current: versionExtraction(versionRaw[1])
    // };

    return versionRaw;
}

function cleanData(data, type) {

    switch (type) {
        case "version": {
            let version = {
                m0: '',
                m1: '',
                m2: '',
                m3: ''
            }

            let regexes = [
                [/(\d+).(\d+).(\d+)-(\S+)/, 4],
                [/(\d+).(\d+).(\d+).(\d+)/, 4],
                [/(\d+).(\d+).(\d+)/, 3]
            ];

            for (let i in regexes) {
                let result = data.match(regexes[i][0]);
                if (result === null) { continue; }
                for (let j = 0; j < regexes[i][1]; j++) {
                    version[`m${j}`] = result[j + 1];
                }
            }
            return version;

        } case "date": {
            let date = {
                year: '',
                month: '',
                day: ''
            }

            let regexes = /(\d+)-(\d+)-(\d+)/;
            let result = data.match(regexes);

            date.year = result[1];
            date.month = result[2];
            date.day = result[3];
            return date;
        }
        // case "tag": {

        // }
    }
}

async function latestVersion(setting) {

}

//until
// function versionExtraction(version) {
//     let regex = /(\d+).(\d+).(\d+)/;
//     let result = version.match(regex);
//     let responce = {
//         m0: result[1],
//         m1: result[2],
//         m2: result[3],
//         m3: ''
//     }

//     return responce;
// }

function combine(v1, v2) {
    let v1Text = `${Number(v1.m0)}${Number(v1.m1)}${Number(v1.m2)}${Number(v1.m3)}`;
    let v2Text = `${Number(v2.m0)}${Number(v2.m1)}${Number(v2.m2)}${Number(v2.m3)}`;

    return v1Text == v2Text;
}