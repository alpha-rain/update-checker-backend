const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
    cmd: cmd
}

async function cmd(cmdData) {
    const { stdout, stderr } = await exec(cmdData);
    let cmdReturn = {
        stdout:stdout,
        stderr:stderr
    }
    return cmdReturn;
}

