const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, manageUrl, mockId } = testData;
const { expect } = chai;
const mockReply = [{
  id: mockId
}]

const apiPath = "/api/v1/pageElement";
baseTest("PageElement", apiPath);
describe("PageElement", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getPageElements", (done) => {
    const { PageElement } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/load`)
    .reply(200, mockReply);

    expect(PageElement).to.respondTo('getPageElements');

    PageElement.getPageElements(testSite).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can createPageElement", (done) => {
    const { PageElement } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}/create`)
    .reply(200, mockReply);

    expect(PageElement).to.respondTo('createPageElement');

    PageElement.createPageElement(testSite).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can savePageElement", (done) => {
    const { PageElement } = SymphonyCommerce(testCredentials);
    const updatedPageElement = {
      id: 456
    }

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}/save`)
    .reply(200, mockReply);

    expect(PageElement).to.respondTo('savePageElement');

    PageElement.savePageElement(testSite, updatedPageElement).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});



