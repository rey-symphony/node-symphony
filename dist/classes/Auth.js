"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path='APIBase.ts'/>
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Auth = (function (_super) {
    __extends(Auth, _super);
    function Auth(options) {
        options.apiPath = "/auth";
        options.email = null;
        options.password = null;
        _super.call(this, options);
    }
    Auth.prototype.registerMember = function (email, password) {
        return this.post({
            site: null,
            overrideBaseUrl: true,
            queryParams: {
                email: email,
                password: password,
                subscribe: true
            },
            endpoint: "/email/register"
        });
    };
    return Auth;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Auth;
