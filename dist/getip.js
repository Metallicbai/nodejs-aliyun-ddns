"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ip = void 0;
const axios_1 = require("axios");
async function getUserIP() {
    try {
        const { data, status } = await axios_1.default.get('https://pv.sohu.com/cityjson?ie=utf-8');
        if (status === 200) {
            let ipJson = data.replace(/(var)|[;=\n\s\t]|(returnCitySN)/g, '');
            ipJson = JSON.parse(ipJson);
            console.log(ipJson.cip);
            return ipJson.cip;
        }
    }
    catch (error) {
    }
    console.log('');
    return '';
}
exports.ip = getUserIP();
