"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var SiteConfig = (function (_super) {
    __extends(SiteConfig, _super);
    function SiteConfig(options) {
        options.apiPath = "/api/v1/site";
        _super.call(this, options);
    }
    SiteConfig.prototype.getAdminConfig = function (site) {
        return this.get({
            site: site,
            endpoint: "/admin"
        });
    };
    return SiteConfig;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = SiteConfig;
