///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Wholesale extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/wholesale`;
    super(options);
  }

  getChannels(site: string) {
    return this.get({
      site,
      endpoint: `/tiers`
    });
  }
}
