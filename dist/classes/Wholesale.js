"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Wholesale = (function (_super) {
    __extends(Wholesale, _super);
    function Wholesale(options) {
        options.apiPath = "/api/v1/wholesale";
        _super.call(this, options);
    }
    Wholesale.prototype.getChannels = function (site) {
        return this.get({
            site: site,
            endpoint: "/tiers"
        });
    };
    return Wholesale;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Wholesale;
