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
        if (reportParams === void 0) { reportParams = {}; }
        var fromDateTimestamp;
        var toDateTimestamp;
        var fromDate = reportParams.fromDate, toDate = reportParams.toDate, _a = reportParams.offset, offset = _a === void 0 ? 0 : _a, noUpload = reportParams.noUpload;
        try {
            fromDateTimestamp = fromDate ? Date.parse(fromDate) : new Date().getTime();
            toDateTimestamp = toDate ? Date.parse(toDate) : new Date().getTime();
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
                offset: offset,
                noUpload: noUpload
            }
        });
    };
    return Report;
}(APIBase_1["default"]));
exports.__esModule = true;
exports["default"] = Report;
