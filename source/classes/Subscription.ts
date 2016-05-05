///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Subscription extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/subscriptions`;
    super(options);
  }

  addSubscriptionItem(site: string, subscriptionId: number, productClusterId: number, productId: number, quantity: number) {
    return this.post({
      site,
      endpoint: `/${subscriptionId}/items`,
      body: [{
        productId,
        productClusterId,
        quantity,
        "op": "ADD_ITEM" 
      }]
    });
  }

  removeSubscriptionItem(site: string, subscriptionId: number, itemId: string) {
    return this.post({
      site,
      endpoint: `/${subscriptionId}/items`,
      body: [{
        itemId,
        "op": "REMOVE_ITEM"
      }]
    });
  }

  updatePriceAtCreation(site: string, subscriptionId: number, productClusterId: number, productId: number, newPrice: string) {
    return this.put({
      site,
      endpoint: `/${subscriptionId}/product-cluster/${productClusterId}/product/${productId}/price-at-creation`,
      body: newPrice
    });
  }
}

