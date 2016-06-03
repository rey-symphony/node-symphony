"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var ASN = (function (_super) {
    __extends(ASN, _super);
    function ASN(options) {
        options.apiPath = "/api/v1/asn";
        _super.call(this, options);
    }
    ASN.prototype.createASN = function (site, asnObject) {
        return this.post({
            site: site,
            body: asnObject
        });
    };
    return ASN;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = ASN;
