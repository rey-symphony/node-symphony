"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='../interfaces/ApiOptions.ts'/>
var APIBase_1 = require('./APIBase');
var _ = require('lodash');
var Member = (function (_super) {
    __extends(Member, _super);
    function Member(options) {
        options.apiPath = "/api/v1/member";
        _super.call(this, options);
    }
    Member.prototype.getMember = function (site, id) {
        return this.get({
            site: site,
            endpoint: "/" + id
        });
    };
    Member.prototype.addCredits = function (site, memberId, delta) {
        return this.post({
            site: site,
            endpoint: "/" + memberId + "/credit",
            queryParams: {
                amount: delta
            }
        });
    };
    Member.prototype.isUserLoggedIntoSite = function (site, domain) {
        return this.get({
            site: site,
            baseUrl: domain,
            apiPath: "/member",
            overrideBaseUrl: true
        }).then(function (body) {
            if (!body || body.purchasingChannel.subdomain !== site) {
                return false;
            }
            return body;
        });
    };
    Member.prototype.checkPermissions = function (site) {
        return this.get({
            site: site
        }).then(function (body) {
            return {
                memberId: body ? body.id : null,
                memberEmail: body ? body.email : null,
                hasPermissions: _.contains(body ? body.organizationsWithSite : null, site),
                isSymphonyEmployee: _.contains(body ? body.email : null, "symphonycommerce")
            };
        });
    };
    Member.prototype.logInToManage = function (site, email, password, subscribe) {
        return this.post({
            site: site,
            includeResponse: true,
            apiPath: "/auth/email/login",
            queryParams: {
                email: email,
                password: password,
                subscribe: subscribe
            },
            overrideBaseUrl: true
        });
    };
    Member.prototype.findOrCreate = function (site, email) {
        return this.post({
            site: site,
            body: email,
            json: false,
            endpoint: "/anonymous"
        });
    };
    return Member;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Member;
