///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Variant extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/inventory`;
    super(options);
  }

  getVariant(site: string, id: number) {
    return this.get({
      site,
      endpoint: `/${id}`
    });
  }

}
