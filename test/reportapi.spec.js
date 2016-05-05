var expect = require("chai").expect;
var syApi = require("../dist/index")({
    email: process.env.syAPI_Email,
    password: process.env.syAPI_Password
});

describe("syApi Report API default ENV", function() {
    site = "kittyprod";
    idNoDates = 129;
    idNeedsDates = 96;
    fromDate = '2015-06-01';
    toDate = '2015-06-02';

	it("can request Report by id and no parameters", function(done) {
		syApi.Report.getReport(site, idNoDates, null, function(err, report) {
			expect(err).to.be.null;
			expect(report).to.be.ok;
			expect(report).to.have.property('reportId');
			expect(report).to.have.property('name');
			expect(report).to.have.property('description');
			expect(report).to.have.property('rows');
			expect(report.rows.length).to.be.above(0);
			done();
		});
	});

	it("can request Report by id and date parameters", function(done) {
		syApi.Report.getReport(site, idNeedsDates, {
			fromDate: fromDate,
			toDate: toDate
		}, function(err, report) {
			expect(err).to.be.null;
			expect(report).to.be.ok;
			expect(report).to.have.property('reportId');
			expect(report).to.have.property('name');
			expect(report).to.have.property('description');
			expect(report).to.have.property('rows');
			expect(report.rows.length).to.be.above(0);
			done();
		});
	});
});