const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, testQuery, manageUrl, mockId } = testData;
const { expect } = chai;
const mockReply = [{
  id: mockId
}]


const apiPath = "/api/v1/site";
baseTest("SiteConfig", apiPath);
describe("SiteConfig", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getAdminConfig", (done) => {
    const { SiteConfig } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/admin`)
    .reply(200, mockReply);

    expect(SiteConfig).to.respondTo('getAdminConfig');

    SiteConfig.getAdminConfig(testSite).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
