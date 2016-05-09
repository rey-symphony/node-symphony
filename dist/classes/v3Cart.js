"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var v3Cart = (function (_super) {
    __extends(v3Cart, _super);
    function v3Cart(options) {
        options.apiPath = "/api/v3/carts";
        _super.call(this, options);
    }
    v3Cart.prototype.getById = function (site, cartId) {
        return this.get({
            site: site,
            endpoint: "/" + cartId,
            overrideBaseUrl: true
        });
    };
    v3Cart.prototype.addCartDiscount = function (site, cartId, discount, percent) {
        return this.put({
            site: site,
            endpoint: "/" + cartId + "/discount",
            body: {
                discount: discount,
                percent: percent
            },
            overrideBaseUrl: true
        });
    };
    return v3Cart;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = v3Cart;
