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

const mockSearch = {
  q: testQuery,
  limit: 5000,
  offset: 0,
  highlight: "",
  sort: false
}


const apiPath = "/api/v1/productcluster";
baseTest("Product", apiPath);
describe("Product", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getProductCluster", (done) => {
    const { Product } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/${mockId}/product`)
    .reply(200, mockReply);

    expect(Product).to.respondTo('getProductCluster');

    Product.getProductCluster(testSite, mockId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can saveProductCluster", (done) => {
    const { Product } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}`, mockProduct)
    .reply(200, mockReply);

    expect(Product).to.respondTo('saveProductCluster');

    Product.saveProductCluster(testSite, mockProduct).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can searchProductClusters", (done) => {
    const { Product } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}`)
    .query(mockSearch)
    .reply(200, mockReply);

    expect(Product).to.respondTo('searchProductClusters');

    Product.searchProductClusters(testSite, testQuery, mockSearch).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
