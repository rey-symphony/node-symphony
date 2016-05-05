///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class SiteConfig extends APIBase {
  constructor(options: ApiOptions) { 
    options.apiPath = `/api/v1/site`;
    super(options); 
  }

  getAdminConfig(site: string) {
    return this.get({
      site: site,
      endpoint: `/admin`
    });
  }
}
