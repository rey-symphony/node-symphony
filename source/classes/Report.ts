///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Report extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/reports`;
    super(options);
  }

  getReport(site: string, reportId: number, reportParams: any) {
    var reportParams = reportParams || {};
    var fromDateTimestamp: number;
    var toDateTimestamp: number;

    try {
      fromDateTimestamp = reportParams.fromDate
        ? Date.parse(reportParams.fromDate)
        : new Date().getTime();

      toDateTimestamp = reportParams.toDate
        ? Date.parse(reportParams.toDate)
        : new Date().getTime();

    } catch (ex) {
      this.logger.error(`error`, ex);
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
  }
}

