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



const apiPath = "/api/v3/carts";
baseTest("v3Cart", apiPath);
describe("v3Cart", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getById", (done) => {
    const { v3Cart } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}`)
    .get(`${apiPath}/${mockId}`)
    .reply(200, mockReply);

    expect(v3Cart).to.respondTo('getById');

    v3Cart.getById(testSite, mockId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can addCartDiscount", (done) => {
    const { v3Cart } = SymphonyCommerce(testCredentials);
    const mockDiscount = 50;
    const isPercent = true;

    nock(`${manageUrl}`)
    .put(`${apiPath}/${mockId}/discount`, (body) => {
      expect(body).to.deep.equal({
        discount: mockDiscount,
        percent: isPercent
      });
      return true;
    })
    .reply(200, mockReply);

    expect(v3Cart).to.respondTo('addCartDiscount');

    v3Cart.addCartDiscount(testSite, mockId, mockDiscount, isPercent).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
