const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, manageUrl } = testData;
const { expect } = chai;


const apiPath = "/org/partner/api/v1/search";
baseTest("SearchSync", apiPath);
describe("SearchSync", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can syncUrlMappings", (done) => {
    const { SearchSync } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}`)
    .post(`${apiPath}/urlmapping`, {subdomain: testSite})
    .reply(200, true);

    expect(SearchSync).to.respondTo('syncUrlMappings');

    SearchSync.syncUrlMappings(testSite).then((result) => {
      expect(result).to.deep.equal(true);
      done();
    });
  });
});
