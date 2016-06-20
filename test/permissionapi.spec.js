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

const apiPath = "/api/v1/access";
baseTest("Permission", apiPath);
describe("Permission", () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it("can getAllPermissions", (done) => {
    const { Permission } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/partner`)
    .get(`${apiPath}/group/all`)
    .query({
      excludeNonSelectable: true
    })
    .reply(200, mockReply);

    expect(Permission).to.respondTo('getAllPermissions');

    Permission.getAllPermissions().then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });

  it("can getMemberAllPermissions", (done) => {
    const { Permission } = SymphonyCommerce(testCredentials);

    nock(`${manageUrl}/org/partner`)
    .get(`${apiPath}/member/${mockId}/access-groups`)
    .query({
      excludeNonSelectable: true
    })
    .reply(200, mockReply);

    expect(Permission).to.respondTo('getMemberAllPermissions');

    Permission.getMemberAllPermissions(mockId).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });


  it("can updatePermissions", (done) => {
    const { Permission } = SymphonyCommerce(testCredentials);
    const accessGroupIds = [123, 456];

    nock(`${manageUrl}/org/partner`)
    .put(`${apiPath}/member/${mockId}/access-groups`, { accessGroupIds })
    .reply(200, mockReply);

    expect(Permission).to.respondTo('updatePermissions');

    Permission.updatePermissions(mockId, accessGroupIds).then((result) => {
      expect(result).to.deep.equal(mockReply);
      done();
    });
  });
});

/*var site = "kittyprod";
  var site2 = "jbrand";
  var site3 = "jacklinks";
  var memberId = 6321371;
  var roles = ['ROLE_ADMIN','ROLE_TEST'];
  var roles2 = ['ROLE_ADMIN','ROLE_PRODUCTION','ROLE_ANONYMOUS'];
  var PermissionApi = SymphonyAPI.Permission;

  this.timeout(500000);

  it("can delete all permissions for a member", function(done) {
      PermissionApi.deleteMemberAllPermissions(memberId).then((ids) => {
          console.log(ids);
          ids.accessGroupIds.should.be.a.array;
          ids.accessGroupIds.should.have.length(0);
          done();
      });
  });

  it("can add selected permissions to a member", function(done) {
      PermissionApi.addMemberPermissions(site, memberId, roles).then(function(ids){
          ids.accessGroupIds.should.be.a.array;
          ids.accessGroupIds.should.have.length(2);
          ids.accessGroupIds[0].should.be.a.number;
          done();
      });
  });

  it("can add selected permissions to a member", function(done) {
      PermissionApi.addMemberPermissions(site2, memberId, roles2).then(function(ids){
          ids.accessGroupIds.should.be.a.array;
          ids.accessGroupIds.should.have.length(5);
          done();
      });
  });

  it("wont add any permissions if role is empty", function(done) {
      PermissionApi.addMemberPermissions(site2, memberId, []).then(function(ids){
          ids.accessGroupIds.should.be.a.array;
          ids.accessGroupIds.should.have.length(5);
          done();
      });
  });

  it("wont add any permissions if role is null", function(done) {
      PermissionApi.addMemberPermissions(site2, memberId, null).then(function(ids){
          ids.accessGroupIds.should.be.a.array;
          ids.accessGroupIds.should.have.length(5);
          done();
      });
  });

  it("wont delete any permissions if member does have permission for that site", function(done) {
      PermissionApi.deleteMemberAllSubdomainPermissions(site3, memberId).then(function(ids){
          ids.accessGroupIds.should.be.a.array;
          ids.accessGroupIds.should.have.length(5);
          done();
      });
  });

  it("will only delete the selected permissions", function(done) {
      PermissionApi.deleteMemberAllSubdomainPermissions(site, memberId).then(function(ids){
          ids.accessGroupIds.should.be.a.array;
          ids.accessGroupIds.should.have.length(3);
          done();
      });
  });*/

// roles = [
// 'ROLE_ANONYMOUS',
// 'ROLE_ADMIN',
// 'ROLE_TEST',
// 'ROLE_VENDOR',
// 'ROLE_CURATOR',
// 'ROLE_PRODUCTION',
// 'ROLE_WHOLESALE_BUYER',
// 'ROLE_DROPSHIP',
// 'ROLE_COMPOSE',
// 'ROLE_NOTIFICATIONS',
// 'ROLE_DOMO',
// 'ROLE_ORDER_API',
// 'ROLE_WAREHOUSE',
// 'ROLE_MANAGE_INTEGRATION',
// 'ROLE_PROMOTIONS'
// ]



