import * as util from "util";
import * as os from "os";

const exec = util.promisify(require('child_process').exec);


export async function cmd(cmdData: string) {
    const { stdout, stderr } = await exec(cmdData);
    let cmdReturn = {
        stdout:stdout,
        stderr:stderr
    }
    return cmdReturn;
}

//get system info
export function osInfo() {
    let info = {
        arch: os.arch(),
        platform: os.platform(),
        type: os.type(),
        release: os.release()
    };
    return info;
}