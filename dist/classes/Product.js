"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Product = (function (_super) {
    __extends(Product, _super);
    function Product(options) {
        options.apiPath = "/api/v1/productcluster";
        _super.call(this, options);
    }
    Product.prototype.getProductCluster = function (site, id) {
        return this.get({
            site: site,
            endpoint: "/" + id + "/product"
        });
    };
    Product.prototype.saveProductCluster = function (site, productCluster) {
        return this.post({
            site: site,
            body: productCluster
        });
    };
    Product.prototype.searchProductClusters = function (site, query, searchParams) {
        var searchParams = searchParams || {};
        return this.get({
            site: site,
            queryParams: {
                q: query || "",
                highlight: searchParams.highlight || "",
                limit: searchParams.limit || 5000,
                offset: searchParams.offset || 0,
                sort: searchParams.sort || false
            }
        });
    };
    return Product;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Product;
