"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='../interfaces/ApiOptions.ts'/>
var APIBase_1 = require('./APIBase');
var Order = (function (_super) {
    __extends(Order, _super);
    function Order(options) {
        options.apiPath = "/api/v1/order";
        _super.call(this, options);
    }
    Order.prototype.getOrder = function (site, id) {
        return this.get({
            site: site,
            endpoint: "/" + id
        });
    };
    Order.prototype.searchOrders = function (site, query, searchParams) {
        var searchParams = searchParams || {};
        return this.get({
            site: site,
            queryParams: {
                q: query || "",
                limit: searchParams.limit || 50,
                offset: searchParams.offset || 0,
                column: searchParams.column || "",
                highlight: searchParams.highlight || false,
                sortAsc: searchParams.sortAsc || false
            }
        });
    };
    Order.prototype.markItemsShipped = function (site, lineItems, notifyMember) {
        return this.post({
            site: site,
            endpoint: "/mark-shipped",
            queryParams: {
                notifyMember: notifyMember
            },
            body: lineItems
        });
    };
    Order.prototype.getCompletedOrders = function (site, query, searchParams) {
        var searchParams = searchParams || {};
        var fromDateTimestamp;
        var toDateTimestamp;
        try {
            fromDateTimestamp = searchParams.from
                ? Date.parse(searchParams.from)
                : new Date().getTime();
            toDateTimestamp = searchParams.to
                ? Date.parse(searchParams.to)
                : new Date().getTime();
        }
        catch (ex) {
            this.logger.log("error", ex);
            return;
        }
        return this.get({
            site: site,
            endpoint: "/completed",
            queryParams: {
                q: query || "",
                from: fromDateTimestamp,
                to: toDateTimestamp
            }
        });
    };
    return Order;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Order;
