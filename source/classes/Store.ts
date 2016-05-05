///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Store extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/store`;
    super(options);
  }

  getStore(site: string, id: number) {
    return this.get({
      site: site,
      queryParams: {
        storeId: id
      }
    });
  }

  saveStore(site: string, store: any) {
    return this.post({
      site: site,
      body: store
    });
  }
}