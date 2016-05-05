///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class v3Cart extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v3/carts`;
    super(options);
  }

  getById(site: string, cartId: number) {
    return this.get({
      site,
      endpoint: `/${cartId}`,
      overrideBaseUrl: true
    });
  }

  addCartDiscount(site: string, cartId: number, discount: number, percent: boolean) {
    return this.put({
      site,
      endpoint: `/${cartId}/discount`,
      body: {
        discount,
        percent
      },
      overrideBaseUrl: true
    });
  }
}
