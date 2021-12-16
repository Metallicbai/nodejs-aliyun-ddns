// This file is auto-generated, don't edit it
import Alidns20150109, * as $Alidns20150109 from '@alicloud/alidns20150109';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import * as $tea from '@alicloud/tea-typescript';
import Util from '@alicloud/tea-util';


class Client {
  private client: Alidns20150109
  private config: $OpenApi.Config


  init(config) {
    const { accessKeyId, accessKeySecret} = config;

    this.config = new $OpenApi.Config({
      // 您的AccessKey ID
      accessKeyId,
      // 您的AccessKey Secret
      accessKeySecret,
    })
    // 访问的域名
    this.config.endpoint = "alidns.cn-hangzhou.aliyuncs.com";
    this.client = new Alidns20150109(this.config);
  }

  async getDescribeDomainRecords(params) {
    const describeDomainRecordsRequest = new $Alidns20150109.DescribeDomainRecordsRequest(params);
    const response = Util.toMap(await this.client.describeDomainRecords(describeDomainRecordsRequest));
    return response.body.DomainRecords.Record;
  }

  async updateDomainRecord(params) {
    try {
      const updateDomainRecordRequest = new $Alidns20150109.UpdateDomainRecordRequest(params);
      const response = Util.toMap(await this.client.updateDomainRecord(updateDomainRecordRequest));
      return response.body.RequestId;
    } catch (error) {
      return '';
    }

  }
}


export { Client };