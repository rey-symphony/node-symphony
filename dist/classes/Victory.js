"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Victory = (function (_super) {
    __extends(Victory, _super);
    function Victory(options) {
        options.apiPath = "/api/v1/cart";
        _super.call(this, options);
    }
    Victory.prototype.getByMember = function (site, memberId) {
        return this.get({
            site: site,
            endpoint: "/" + site + "/" + memberId,
            overrideBaseUrl: true
        });
    };
    Victory.prototype.addCartDiscount = function (site, memberId, discount, percent) {
        return this.put({
            site: site,
            endpoint: "/" + site + "/" + memberId,
            queryParams: {
                discount: discount,
                percent: percent
            },
            overrideBaseUrl: true
        });
    };
    Victory.prototype.updateItemQuantity = function (site, lineItemId, quantity) {
        return this.put({
            site: site,
            endpoint: "/" + site + "/" + lineItemId,
            queryParams: {
                quantity: quantity
            },
            overrideBaseUrl: true
        });
    };
    return Victory;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Victory;
