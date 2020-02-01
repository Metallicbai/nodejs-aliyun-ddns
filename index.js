const Core = require('@alicloud/pop-core');
const axios = require('axios');

let client;


async function getRecordId(config) {
  try {
    const { DomainRecords } = await client.request('DescribeDomainRecords', {
      DomainName: config.DomainName,
      RRKeyWord: config.RRKeyWord
    });
    const { Record } = DomainRecords;
    const record = Record.filter(t => t.RR === config.RRKeyWord)[0];
    if (record) {
      return record.RecordId;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserIP() {
  const { data, status } = await axios.get('https://pv.sohu.com/cityjson?ie=utf-8');
  if (status === 200) {
    let ipJson = data.replace(/(var)|[;=\n\s\t]|(returnCitySN)/g, '');
    ipJson = JSON.parse(ipJson);
    return ipJson.cip;
  }
}


async function updateUserDNSRecord({ RecordId, Value, RR }) {
  try {
    const result = await client.request('UpdateDomainRecord', {
      RecordId,
      Value,
      RR,
      type: 'A'
    });
    return result.RequestId;
  } catch (error) {
    console.log(error);
  }
}


async function start(config) {
  const ip = await getUserIP();
  if (!ip) {
    console.error('未获取到 ip');
    return;
  }
  console.log('当前 ip 是 :', ip);
  client = new Core({
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    endpoint: 'https://alidns.aliyuncs.com',
    apiVersion: '2015-01-09'
  });
  const RecordId = await getRecordId(config);
  if (!RecordId) {
    console.error('未获取到用户 RecordId');
    return;
  }
  console.log('域名的 RecordId 是  :', RecordId);
  console.log(`即将对 ${config.RRKeyWord}.${config.DomainName} 进行 ddns`);
  const RequestId = await updateUserDNSRecord({
    RecordId,
    Value: ip,
    RR: config.RRKeyWord,
  });
  if (RequestId) {
    console.log(`域名 ${config.RRKeyWord}.${config.DomainName} 已经映射到ip ${ip}`);
  } else {
    console.log('ddns 失败');
  }
};
module.exports = start;