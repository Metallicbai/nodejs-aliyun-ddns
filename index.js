const {Client} = require('./dist');
const argv = require('minimist')(process.argv.slice(2));


const client = new Client();

async function main() {
  const { ip, accessKeyId = '', accessKeySecret = '', domain, RR } = argv;
  client.init({
    accessKeyId,
    accessKeySecret,
  })
  const records = await client.getDescribeDomainRecords({
    domainName: domain,
    RRKeyWord: RR
  });
  const { Type: type, RecordId: recordId } = records.filter(item => item.RR === RR)[0] || {};
  if (type && recordId) {
    const RequestId = await client.updateDomainRecord({
      recordId,
      RR,
      type,
      value: ip
    });
    if (RequestId) {
      console.log(true);
      return true;
    }
  }
  console.log(false);
  return false;
}

main();