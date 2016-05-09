"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var UrlMapping = (function (_super) {
    __extends(UrlMapping, _super);
    function UrlMapping(options) {
        options.apiPath = "/api/v1/seo";
        _super.call(this, options);
    }
    UrlMapping.prototype.searchMappings = function (site, query, searchParams) {
        var searchParams = searchParams || {};
        return this.get({
            site: site,
            endpoint: "/urlmapping-search",
            queryParams: {
                q: query || "",
                limit: searchParams.limit || 50,
                sort: searchParams.sort || "fromUrl",
                start: searchParams.start || 0,
                highlight: searchParams.highlight || false
            }
        });
    };
    UrlMapping.prototype.updateMapping = function (site, mappingParams) {
        return this.put({
            site: site,
            body: {
                fromUrl: mappingParams.fromUrl,
                toUrl: mappingParams.toUrl,
                id: mappingParams.id || "",
                type: mappingParams.type,
                subdomain: site
            },
            endpoint: "/urlmapping-update"
        });
    };
    return UrlMapping;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = UrlMapping;
