"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../interfaces/ApiOptions.ts"/>
var APIBase_1 = require('./APIBase');
var Report = (function (_super) {
    __extends(Report, _super);
    function Report(options) {
        options.apiPath = "/api/v1/reports";
        _super.call(this, options);
    }
    Report.prototype.getReport = function (site, reportId, reportParams) {
        var reportParams = reportParams || {};
        var fromDateTimestamp;
        var toDateTimestamp;
        try {
            fromDateTimestamp = reportParams.fromDate
                ? Date.parse(reportParams.fromDate)
                : new Date().getTime();
            toDateTimestamp = reportParams.toDate
                ? Date.parse(reportParams.toDate)
                : new Date().getTime();
        }
        catch (ex) {
            this.logger.error("error", ex);
            return;
        }
        return this.get({
            site: site,
            queryParams: {
                reportId: reportId,
                fromDate: fromDateTimestamp,
                toDate: toDateTimestamp,
                offset: reportParams.offset || 0
            }
        });
    };
    return Report;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Report;
