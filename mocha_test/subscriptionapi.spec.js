const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const { expect } = chai;
const { testCredentials, testSite, 
        testQuery, manageUrl, mockId } = require("./test-config");

const mockProductId = 555;
const mockProductClusterId = 178;
const mockReply = { 
  id: mockId  
}

const apiPath = "/api/v1/subscriptions";
baseTest("Subscription", apiPath);
describe("Subscription", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can addSubscriptionItem", (done) => {
    const { Subscription } = SymphonyCommerce(testCredentials);
    const mockQuantity = 5;

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}/${mockId}/items`, [{
      productId: mockProductId,
      productClusterId: mockProductClusterId,
      quantity: mockQuantity,
      "op": "ADD_ITEM" 
    }])
    .reply(200, mockReply);

    expect(Subscription).to.respondTo('addSubscriptionItem');

    Subscription.addSubscriptionItem(testSite, mockId, mockProductClusterId, mockProductId, mockQuantity).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can removeSubscriptionItem", (done) => {
    const { Subscription } = SymphonyCommerce(testCredentials);
    const mockItemId = 345;

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}/${mockId}/items`, [{
      itemId: mockItemId,
      "op": "REMOVE_ITEM"
    }])
    .reply(200, mockReply);

    expect(Subscription).to.respondTo('removeSubscriptionItem');

    Subscription.removeSubscriptionItem(testSite, mockId, mockItemId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can updatePriceAtCreation", (done) => {
    const { Subscription } = SymphonyCommerce(testCredentials);
    const mockNewPrice = 100;

    nock(`${manageUrl}/org/${testSite}`)
    .put(`${apiPath}/${mockId}/product-cluster/${mockProductClusterId}/product/${mockProductId}/price-at-creation`, function(body) {
      return body === mockNewPrice;
    })
    .reply(200, mockReply);

    expect(Subscription).to.respondTo('updatePriceAtCreation');

    Subscription.updatePriceAtCreation(testSite, mockId, mockProductClusterId, mockProductId, mockNewPrice).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
