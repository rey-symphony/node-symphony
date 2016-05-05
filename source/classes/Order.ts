///<reference path='../interfaces/ApiOptions.ts'/>
import APIBase from './APIBase';

export default class Order extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/order`;
    super(options);
  }

  getOrder(site: string, id: number) {
    return this.get({
      site,
      endpoint: `/${id}`
    });
  }

  searchOrders(site: string, query: string, searchParams?: any) {
    var searchParams = searchParams || {};
    return this.get({
      site,
      queryParams: {
        q: query || ``,
        limit: searchParams.limit || 50,
        offset: searchParams.offset || 0,
        column: searchParams.column || ``,
        highlight: searchParams.highlight || false,
        sortAsc: searchParams.sortAsc || false
      }
    });
  }

  markItemsShipped(site: string, lineItems: Object, notifyMember: boolean) {
    return this.post({
      site,
      endpoint: `/mark-shipped`,
      queryParams: {
        notifyMember
      },
      body: lineItems
    });
  }

  getCompletedOrders(site: string, query: string, searchParams: any) {
    var searchParams = searchParams || {};
    var fromDateTimestamp: number;
    var toDateTimestamp: number;

    try {
      fromDateTimestamp = searchParams.from
        ? Date.parse(searchParams.from)
        : new Date().getTime();

      toDateTimestamp = searchParams.to
        ? Date.parse(searchParams.to)
        : new Date().getTime();

    } catch (ex) {
      this.logger.log(`error`, ex);
      return;
    }

    return this.get({
      site,
      endpoint: `/completed`,
      queryParams: {
        q: query || ``,
        from: fromDateTimestamp,
        to: toDateTimestamp
      }
    });
  }
}
