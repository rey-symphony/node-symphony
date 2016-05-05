const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, testQuery, manageUrl, mockId } = testData;
const { expect } = chai;
const mockReply = { id: mockId }

const apiPath = "/api/v1/wholesale";
baseTest("Wholesale", apiPath);
describe("Wholesale", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getChannels", (done) => {
    const { Wholesale } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/tiers`)
    .reply(200, mockReply);

    expect(Wholesale).to.respondTo('getChannels');

    Wholesale.getChannels(testSite).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
