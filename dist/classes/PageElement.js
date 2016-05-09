"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var PageElement = (function (_super) {
    __extends(PageElement, _super);
    function PageElement(options) {
        options.apiPath = "/api/v1/pageElement";
        _super.call(this, options);
    }
    PageElement.prototype.getPageElements = function (site) {
        return this.get({
            site: site,
            endpoint: "/load"
        });
    };
    PageElement.prototype.createPageElement = function (site) {
        return this.post({
            site: site,
            endpoint: "/create"
        });
    };
    PageElement.prototype.savePageElement = function (site, pageElement) {
        return this.post({
            site: site,
            body: pageElement,
            endpoint: "/save"
        });
    };
    return PageElement;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = PageElement;
