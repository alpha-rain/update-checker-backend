const util = require('util');
const exec = util.promisify(require('child_process').exec);
const os = require('os');

module.exports = {
    cmd: cmd,
    osInfo: osInfo
}

async function cmd(cmdData) {
    const { stdout, stderr } = await exec(cmdData);
    let cmdReturn = {
        stdout:stdout,
        stderr:stderr
    }
    return cmdReturn;
}

//get system info
function osInfo() {
    let info = {
        arch: os.arch(),
        platform: os.platform(),
        type: os.type(),
        release: os.release()
    };
    return info;
}