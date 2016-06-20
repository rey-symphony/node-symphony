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
const mockProduct = {
  id: mockId,
  name: "mockname"
}


const apiPath = "/api/v1/inventory";
baseTest("Variant", apiPath);
describe("Variant", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getVariant", (done) => {
    const { Variant } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/${mockId}`)
    .reply(200, mockReply);

    expect(Variant).to.respondTo('getVariant');

    Variant.getVariant(testSite, mockId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

});
