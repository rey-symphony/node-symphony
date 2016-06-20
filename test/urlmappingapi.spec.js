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

const apiPath = "/api/v1/seo";
baseTest("UrlMapping", apiPath);
describe("UrlMapping", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can searchMappings", (done) => {
    const { UrlMapping } = SymphonyCommerce(testCredentials);
    const mockSearch = {
      q: testQuery,
      limit: 50,
      highlight: false,
      start: 0,
      sort: 'fromUrl'
    }


    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/urlmapping-search`)
    .query(mockSearch)
    .reply(200, mockReply);

    expect(UrlMapping).to.respondTo('searchMappings');

    UrlMapping.searchMappings(testSite, testQuery).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can updateMapping", (done) => {
    const { UrlMapping } = SymphonyCommerce(testCredentials);
    const mockMappingParams = { 
      fromUrl: "fromUrl", 
      toUrl: "toUrl", 
      id: "", 
      type: "REDIRECT", 
      subdomain: testSite 
    }

    nock(`${manageUrl}/org/${testSite}`)
    .put(`${apiPath}/urlmapping-update`, (body) => {
      expect(body).to.deep.equal(mockMappingParams);
      return true;
    })
    .reply(200, mockReply);

    expect(UrlMapping).to.respondTo('updateMapping');

    UrlMapping.updateMapping(testSite, mockMappingParams).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
