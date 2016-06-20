const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, manageUrl, testQuery, mockId: mockOrderId } = testData;
const { expect } = chai;
const mockSearch = {
  q: testQuery,
  limit: 50,
  offset: 0,
  column: "",
  highlight: false,
  sortAsc: false
}
const mockLineItems = [{
  id: 123
},{
  id: 456
}]

const mockReply = {
  id: mockOrderId
}

const apiPath = "/api/v1/order";
baseTest("Order", apiPath);
describe("Order", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getOrder", (done) => {
    const { Order } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/${mockOrderId}`)
    .reply(200, mockReply);

    expect(Order).to.respondTo('getOrder');

    Order.getOrder(testSite, mockOrderId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can searchOrders", (done) => {
    const { Order } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}`)
    .query(mockSearch)
    .reply(200, mockReply);

    expect(Order).to.respondTo('searchOrders');

    Order.searchOrders(testSite, testQuery).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can markItemsShipped", (done) => {
    const { Order } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}/mark-shipped`, mockLineItems)
    .query({
      notifyMember: false
    })
    .reply(200, mockReply);

    expect(Order).to.respondTo('markItemsShipped');

    Order.markItemsShipped(testSite, mockLineItems, false).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can getCompletedOrders", (done) => {
    const { Order } = SymphonyCommerce(testCredentials);
    const searchParams = {
      q: "",
      from: 1420070400000,
      to: 1420156800000
    }

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/completed`)
    .query(searchParams)
    .reply(200, mockReply);

    expect(Order).to.respondTo('getCompletedOrders');

    Order.getCompletedOrders(testSite, "", {
      from: "2015-01-01",
      to: "2015-01-02"
    }).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});
