///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Product extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/productcluster`;
    super(options);
  }

  getProductCluster(site: string, id: number) {
    return this.get({
      site,
      endpoint: `/${id}/product`
    });
  }

  saveProductCluster(site: string, productCluster: any) {
    return this.post({
      site,
      body: productCluster
    });
  }

  searchProductClusters(site: string, query: string, searchParams: any) {
    var searchParams = searchParams || {};
    return this.get({
      site,
      queryParams: {
        q: query || ``,
        highlight: searchParams.highlight || ``,
        limit: searchParams.limit || 5000,
        offset: searchParams.offset || 0,
        sort: searchParams.sort || false,
      }
    });
  }
}
