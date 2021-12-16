#!/bin/ev bash
cd `pwd`;
_DEFAULT_ACCOUNT_CONF_PATH="./acount.conf";

if [ -f "$_DEFAULT_ACCOUNT_CONF_PATH" ]; then
  . "$_DEFAULT_ACCOUNT_CONF_PATH"
fi


lastiplog="lastip.log"
  
if [ ! -f "$lastiplog" ]; then
  touch "$lastiplog"
fi

lastip=`tail $lastiplog`;

echo '上次ddns的ip' $lastip;

ip=`node ./dist/getip.js`;

echo '当前的ip' $ip;
if [ "$lastip" != "$ip" -a "$ip" != "" ]; then
result=`node ./index.js --ip=$ip --accessKeyId=$accessKeyId --accessKeySecret=$accessKeySecret --domain=$domain --RR=$RR`;

echo "更新ddns结果" $result;

if [ $result == true ]; then
echo "域名: $RR.$domain dns已经更新到 $ip"; 
echo $ip > $lastiplog
fi;

fi;
