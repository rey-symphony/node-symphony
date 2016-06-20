const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, manageUrl, testQuery, mockId } = testData;
const { expect } = chai;

const mockReply = {
  id: mockId
}

const apiPath = "/api/v1/reports";
baseTest("Report", apiPath);
describe("Report", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getReport", (done) => {
    const { Report } = SymphonyCommerce(testCredentials);
    const mockRequest = {
      reportId: mockId,
      fromDate: 1420070400000,
      toDate: 1420156800000,
      offset: 0,
      noUpload: true
    }

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}`)
    .query(mockRequest)
    .reply(200, mockReply);

    expect(Report).to.respondTo('getReport');

    Report.getReport(testSite, mockId, {
      fromDate: "2015-01-01",
      toDate: "2015-01-02"
    }).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
