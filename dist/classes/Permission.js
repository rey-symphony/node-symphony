"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var _ = require('lodash');
var Permission = (function (_super) {
    __extends(Permission, _super);
    function Permission(options) {
        options.apiPath = "/api/v1/access";
        _super.call(this, options);
    }
    Permission.prototype.getAllPermissions = function () {
        return this.get({
            site: "partner",
            endpoint: "/group/all",
            queryParams: {
                excludeNonSelectable: true
            }
        });
    };
    Permission.prototype.getMemberAllPermissions = function (memberId) {
        return this.get({
            site: "partner",
            endpoint: "/member/" + memberId + "/access-groups"
        });
    };
    Permission.prototype.updatePermissions = function (memberId, accessGroupIds) {
        return this.put({
            site: "partner",
            body: { accessGroupIds: accessGroupIds },
            endpoint: "/member/" + memberId + "/access-groups"
        });
    };
    return Permission;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Permission;
