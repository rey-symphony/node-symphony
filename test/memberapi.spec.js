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

const apiPath = "/api/v1/member";

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

baseTest("Member", apiPath);
describe("Member", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getMember", (done) => {
    const { Member } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/${testSite}`)
    .get(`${apiPath}/${mockMemberId}`)
    .reply(200, mockReply);

    expect(Member).to.respondTo('getMember');

    Member.getMember(testSite, mockMemberId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can addCredits", (done) => {
    const { Member } = SymphonyCommerce(testCredentials);
    const mockCredits = 100;

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}/${mockMemberId}/credit`)
    .query({
      amount: mockCredits
    })
    .reply(200, mockReply);


    expect(Member).to.respondTo('addCredits');

    Member.addCredits(testSite, mockMemberId, mockCredits).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can checkPermissions", (done) => {
    const { Member } = SymphonyCommerce(testCredentials);
    const response = {
      memberId: mockMemberId,
      memberEmail: testCredentials.email,
      hasPermissions: true,
      isSymphonyEmployee: false
    }

    nock(`${manageUrl}/org/${testSite}`)
    .get(apiPath)
    .reply(200, mockReply);


    expect(Member).to.respondTo('checkPermissions');

    Member.checkPermissions(testSite).then((result) => {
      expect(result).to.deep.equal(response);
      done();
    });
  });

  it("should have isUserLoggedIntoSite", (done) => {
    const { Member } = SymphonyCommerce(testCredentials);
    const mockDomain = `https://www.${testSite}.com`;

    nock(mockDomain)
    .get("/member")
    .reply(200, mockReply)

    expect(Member).to.respondTo('isUserLoggedIntoSite');

    Member.isUserLoggedIntoSite(testSite, mockDomain).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("isUserLoggedIntoSite can fail", (done) => {
    const { Member } = SymphonyCommerce(testCredentials);
    const mockDomain = `https://www.${testSite}.com`;

    nock(mockDomain)
    .get("/member")
    .reply(200, mockReply)

    expect(Member).to.respondTo('isUserLoggedIntoSite');

    Member.isUserLoggedIntoSite("failSite", mockDomain).then((result) => {
      expect(result).to.deep.equal(false);
      done();
    });
  });


  it("can logInToManage", (done) => {
    const { Member } = SymphonyCommerce(testCredentials);
    const { email, password } = testCredentials

    nock(`${manageUrl}`)
    .post(`/auth/email/login`)
    .query({
      email,
      password,
      subscribe: false
    })
    .reply(200, mockReply);

    expect(Member).to.respondTo('logInToManage');

    Member.logInToManage(testSite, email, password, false).then((result) => {
      expect(result).to.have.property("headers");
      expect(result).to.have.property("body");
      done();
    });
  });

  it("can findOrCreate", (done) => {
    const { Member } = SymphonyCommerce({
      env: "manage"
    });
    const { email } = testCredentials;

    nock(`${manageUrl}/org/${testSite}`)
    .post(`${apiPath}/anonymous`, testCredentials.email)
    .reply(200, mockReply);

    expect(Member).to.respondTo('findOrCreate');

    Member.findOrCreate(testSite, email).then((result) => {
      expect(JSON.parse(result)).to.deep.equal(mockReply);
      done();
    });
  });
});