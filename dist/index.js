"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
// This file is auto-generated, don't edit it
const alidns20150109_1 = require("@alicloud/alidns20150109"), $Alidns20150109 = alidns20150109_1;
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const $OpenApi = require("@alicloud/openapi-client");
const tea_util_1 = require("@alicloud/tea-util");
class Client {
    init(config) {
        const { accessKeyId, accessKeySecret } = config;
        this.config = new $OpenApi.Config({
            // 您的AccessKey ID
            accessKeyId,
            // 您的AccessKey Secret
            accessKeySecret,
        });
        // 访问的域名
        this.config.endpoint = "alidns.cn-hangzhou.aliyuncs.com";
        this.client = new alidns20150109_1.default(this.config);
    }
    async getDescribeDomainRecords(params) {
        const describeDomainRecordsRequest = new $Alidns20150109.DescribeDomainRecordsRequest(params);
        const response = tea_util_1.default.toMap(await this.client.describeDomainRecords(describeDomainRecordsRequest));
        return response.body.DomainRecords.Record;
    }
    async updateDomainRecord(params) {
        try {
            const updateDomainRecordRequest = new $Alidns20150109.UpdateDomainRecordRequest(params);
            const response = tea_util_1.default.toMap(await this.client.updateDomainRecord(updateDomainRecordRequest));
            return response.body.RequestId;
        }
        catch (error) {
            return '';
        }
    }
}
exports.Client = Client;
