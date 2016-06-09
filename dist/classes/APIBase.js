///<reference path="../../typings/tsd.d.ts"/>
///<reference path="../interfaces/ApiParams.ts"/>
///<reference path="../interfaces/ApiOptions.ts"/>
///<reference path="../interfaces/ApiHeaders.ts"/>
///<reference path="../interfaces/RequestOptions.ts"/>
"use strict";
var btoa2 = require("btoa");
var request = require("request-promise");
var APIBase = (function () {
    function APIBase(apiOptions) {
        var manageEnv = apiOptions.env || "manage";
        this.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        this.logger = apiOptions.logger ? apiOptions.logger : console;
        this.apiPath = apiOptions.apiPath;
        this.baseUrl = "https://" + manageEnv + ".symphonycommerce.com";
        if (apiOptions.basicAuth) {
            this.headers["Authorization"] = apiOptions.basicAuth;
            return;
        }
        if (apiOptions.email && apiOptions.password) {
            this.headers["Authorization"] = "Basic " + btoa2(apiOptions.email + ":" + apiOptions.password);
            return;
        }
        if (apiOptions.sessionId) {
            this.headers["Cookie"] = "SPSESSIONID=" + apiOptions.sessionId;
            return;
        }
        if (apiOptions.cookieAuth) {
            this.headers["Cookie"] = apiOptions.cookieAuth;
            return;
        }
    }
    APIBase.prototype.get = function (params) {
        var options = {
            method: "GET",
            baseUrl: params.overrideBaseUrl ? (params.baseUrl || this.baseUrl) :
                this.baseUrl + "/org/" + params.site,
            uri: (params.apiPath || this.apiPath) + (params.endpoint || ""),
            qs: params.queryParams || "",
            json: true
        };
        return this.doRequest(options);
    };
    APIBase.prototype.put = function (params) {
        return this.putPost("PUT", params);
    };
    APIBase.prototype.post = function (params) {
        return this.putPost("POST", params);
    };
    APIBase.prototype.putPost = function (type, params) {
        var options = {
            method: type,
            baseUrl: params.overrideBaseUrl ? this.baseUrl : this.baseUrl + "/org/" + params.site,
            uri: (params.apiPath || this.apiPath) + (params.endpoint || ""),
            qs: params.queryParams || "",
            resolveWithFullResponse: params.includeResponse,
            json: typeof params.json === 'undefined' ? true : params.json,
            body: params.body,
            form: params.form
        };
        return this.doRequest(options);
    };
    APIBase.prototype.doRequest = function (options) {
        this.logger.info(("[ " + options.method + " ] : ") + options.uri);
        //request.debug = true;
        options.headers = this.headers;
        return request(options);
    };
    return APIBase;
}());
exports.__esModule = true;
exports["default"] = APIBase;
