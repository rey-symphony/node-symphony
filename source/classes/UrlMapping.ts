///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class UrlMapping extends APIBase {
  constructor(options: ApiOptions) { 
    options.apiPath = `/api/v1/seo`;
    super(options); 
  }

  searchMappings(site: string, query: string, searchParams?: any) {
    var searchParams = searchParams || {};
    return this.get({
      site,
      endpoint: `/urlmapping-search`,
      queryParams: {
        q: query || ``,
        limit: searchParams.limit || 50,
        sort: searchParams.sort || `fromUrl`,
        start: searchParams.start || 0,
        highlight: searchParams.highlight || false
      }
    });
  }

  updateMapping(site: string, mappingParams: any) {
    return this.put({
      site: site,
      body: { 
        fromUrl: mappingParams.fromUrl, 
        toUrl: mappingParams.toUrl, 
        id: mappingParams.id || "", 
        type: mappingParams.type, 
        subdomain: site 
      },
      endpoint: `/urlmapping-update`
    });
  }
}