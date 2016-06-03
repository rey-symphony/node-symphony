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
const mockASN = {
  id: mockId,
  name: "mockname"
}


const apiPath = "/api/v1/asn";
baseTest("ASN", apiPath);
describe("ASN", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can createASN", (done) => {
    const { ASN } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}`, mockASN)
    .reply(200, mockReply);

    expect(ASN).to.respondTo('createASN');

    ASN.createASN(testSite, mockASN).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

});
