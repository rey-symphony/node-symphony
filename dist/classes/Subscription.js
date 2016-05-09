"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Subscription = (function (_super) {
    __extends(Subscription, _super);
    function Subscription(options) {
        options.apiPath = "/api/v1/subscriptions";
        _super.call(this, options);
    }
    Subscription.prototype.addSubscriptionItem = function (site, subscriptionId, productClusterId, productId, quantity) {
        return this.post({
            site: site,
            endpoint: "/" + subscriptionId + "/items",
            body: [{
                    productId: productId,
                    productClusterId: productClusterId,
                    quantity: quantity,
                    "op": "ADD_ITEM"
                }]
        });
    };
    Subscription.prototype.removeSubscriptionItem = function (site, subscriptionId, itemId) {
        return this.post({
            site: site,
            endpoint: "/" + subscriptionId + "/items",
            body: [{
                    itemId: itemId,
                    "op": "REMOVE_ITEM"
                }]
        });
    };
    Subscription.prototype.updatePriceAtCreation = function (site, subscriptionId, productClusterId, productId, newPrice) {
        return this.put({
            site: site,
            endpoint: "/" + subscriptionId + "/product-cluster/" + productClusterId + "/product/" + productId + "/price-at-creation",
            body: newPrice
        });
    };
    return Subscription;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Subscription;
