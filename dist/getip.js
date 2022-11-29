"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ip = void 0;
const axios_1 = require("axios");
async function getUserIP() {
    try {
        const { data, status } = await axios_1.default.get('http://myip.ipip.net');
        if (status === 200) {
            let iptext = data.replace(/(var)|[;=\n\s\t]|(returnCitySN)/g, '');
            try {
                iptext = iptext.match(/((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/)[0];
            }
            catch (error) {
            }
            // ipJson = JSON.parse(ipJson);
            console.log(iptext);
            return iptext;
        }
    }
    catch (error) {
    }
    console.log('');
    return '';
}
exports.ip = getUserIP();
