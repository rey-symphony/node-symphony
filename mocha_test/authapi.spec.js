const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const baseTest = require("./base-test");
const SymphonyCommerce = require("../dist");
const testData = require("./test-config");

const { testCredentials, testSite, manageUrl, 
        mockId: mockMemberId } = testData;

const { expect } = chai;

const mockReply = {
  id: mockMemberId, 
  email: testCredentials.email,
  organizationsWithSite: [
    testSite
  ],
  purchasingChannel: {
    subdomain: testSite
  }
};

const apiPath = "/auth";
baseTest("Auth", apiPath);
describe("Auth", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can register a mamber", (done) => {
    const { Auth } = SymphonyCommerce(testCredentials);
    const { email, password } = testCredentials;

    nock(`${manageUrl}`)
    .post(`/auth/email/register`)
    .query({
      email,
      password,
      subscribe: true
    })
    .reply(200, mockReply);

    expect(Auth).to.respondTo('registerMember');

    Auth.registerMember(email, password).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});

/*var AuthApi = SymphonyAPI.Auth;
  console.log(AuthApi);
  var email = 'testing3@symphonycommerce.com';
  var password = 'sDFSFwr23rFAF';

  this.timeout(10000);

  it("can register member", function(done) {
      AuthApi.registerMember(email,password).then(function(result){
          console.log(result);
          done();
      });
  });*/