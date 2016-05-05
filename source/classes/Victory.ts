///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Victory extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/cart`;
    super(options);
  }

  getByMember(site: string, memberId: number) {
    return this.get({
      site,
      endpoint: `/${site}/${memberId}`,
      overrideBaseUrl: true
    });
  }

  addCartDiscount(site: string, memberId: number, discount: number, percent: boolean) {
    return this.put({
      site,
      endpoint: `/${site}/${memberId}`,
      queryParams: {
        discount,
        percent
      },
      overrideBaseUrl: true
    });
  }

  updateItemQuantity(site: string, lineItemId: number, quantity: number) {
    return this.put({
      site,
      endpoint: `/${site}/${lineItemId}`,
      queryParams: {
        quantity: quantity
      },
      overrideBaseUrl: true
    });
  }
}

