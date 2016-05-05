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
const mockStore = {
  id: mockId,
  name: "mockname"
}


const apiPath = "/api/v1/store";
baseTest("Store", apiPath);
describe("Store", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getStore", (done) => {
    const { Store } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}`)
    .query({
      storeId: mockId
    })
    .reply(200, mockReply);

    expect(Store).to.respondTo('getStore');

    Store.getStore(testSite, mockId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can saveStore", (done) => {
    const { Store } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}`, mockStore)
    .reply(200, mockReply);

    expect(Store).to.respondTo('saveStore');

    Store.saveStore(testSite, mockStore).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
