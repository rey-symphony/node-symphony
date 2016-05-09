"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var SearchSync = (function (_super) {
    __extends(SearchSync, _super);
    function SearchSync(options) {
        options.apiPath = "/org/partner/api/v1/search";
        _super.call(this, options);
    }
    SearchSync.prototype.syncUrlMappings = function (site) {
        var searchParams = searchParams || {};
        return this.post({
            site: site,
            form: {
                subdomain: site
            },
            overrideBaseUrl: true,
            endpoint: "/urlmapping"
        });
    };
    return SearchSync;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = SearchSync;
