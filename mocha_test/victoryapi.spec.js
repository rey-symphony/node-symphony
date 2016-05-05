const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, testQuery, manageUrl, mockId: mockMemberId } = testData;
const { expect } = chai;
const mockReply = { id: 555 }


const apiPath = "/api/v1/cart";
baseTest("Victory", apiPath);
describe("Victory", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getByMember", (done) => {
    const { Victory } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}`)
    .get(`${apiPath}/${testSite}/${mockMemberId}`)
    .reply(200, mockReply);

    expect(Victory).to.respondTo('getByMember');

    Victory.getByMember(testSite, mockMemberId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can addCartDiscount", (done) => {
    const { Victory } = SymphonyCommerce(testCredentials);
    const mockDiscount = 50;
    const isPercent = true;

    nock(`${manageUrl}`)
    .put(`${apiPath}/${testSite}/${mockMemberId}`)
    .query({
      discount: mockDiscount,
      percent: isPercent
    })
    .reply(200, mockReply);

    expect(Victory).to.respondTo('addCartDiscount');

    Victory.addCartDiscount(testSite, mockMemberId, mockDiscount, isPercent).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can updateItemQuantity", (done) => {
    const { Victory } = SymphonyCommerce(testCredentials);
    const mockLineItemId = 334;
    const mockQuantity = 1;

    nock(`${manageUrl}`)
    .put(`${apiPath}/${testSite}/${mockLineItemId}`)
    .query({
      quantity: mockQuantity
    })
    .reply(200, mockReply);

    expect(Victory).to.respondTo('updateItemQuantity');

    Victory.updateItemQuantity(testSite, mockLineItemId, mockQuantity).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });


});
