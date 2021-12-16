import axios from 'axios';

async function getUserIP() {
  try {
    const { data, status } = await axios.get('https://pv.sohu.com/cityjson?ie=utf-8');
    if (status === 200) {
      let ipJson = data.replace(/(var)|[;=\n\s\t]|(returnCitySN)/g, '');
      ipJson = JSON.parse(ipJson);
      console.log(ipJson.cip);
      return ipJson.cip;
    }
  } catch (error) {
  }
  console.log('');
  return '';
}

export const ip = getUserIP()