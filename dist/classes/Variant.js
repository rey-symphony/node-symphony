"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Variant = (function (_super) {
    __extends(Variant, _super);
    function Variant(options) {
        options.apiPath = "/api/v1/inventory";
        _super.call(this, options);
    }
    Variant.prototype.getVariant = function (site, id) {
        return this.get({
            site: site,
            endpoint: "/" + id
        });
    };
    return Variant;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Variant;
