///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class ASN extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/asn`;
    super(options);
  }

  createASN(site: string, asnObject: any) {
    return this.post({
      site,
      body: asnObject
    });
  }
}
