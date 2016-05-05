///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class SearchSync extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/org/partner/api/v1/search`;
    super(options);
  }

  syncUrlMappings(site: string) {
    var searchParams = searchParams || {};
    return this.post({
      site,
      form: {
        subdomain: site
      },
      overrideBaseUrl: true,
      endpoint: `/urlmapping`
    });
  }
}

