///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Report extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/reports`;
    super(options);
  }

  getReport(site: string, reportId: number, reportParams: any = {}) {
    let fromDateTimestamp: number;
    let toDateTimestamp: number;

    const { fromDate, toDate, offset = 0, noUpload } = reportParams;

    try {
      fromDateTimestamp = fromDate ? Date.parse(fromDate) : new Date().getTime();
      toDateTimestamp = toDate ? Date.parse(toDate) : new Date().getTime();
    } catch (ex) {
      this.logger.error(`error`, ex);
      return;
    }

    return this.get({
      site: site,
      queryParams: {
        reportId,
        fromDate: fromDateTimestamp,
        toDate: toDateTimestamp,
        offset,
        noUpload
      }
    });
  }
}

