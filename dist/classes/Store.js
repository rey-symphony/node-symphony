"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(options) {
        options.apiPath = "/api/v1/store";
        _super.call(this, options);
    }
    Store.prototype.getStore = function (site, id) {
        return this.get({
            site: site,
            queryParams: {
                storeId: id
            }
        });
    };
    Store.prototype.saveStore = function (site, store) {
        return this.post({
            site: site,
            body: store
        });
    };
    return Store;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Store;
