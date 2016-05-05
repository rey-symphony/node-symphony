const _ = require("lodash");
const chai = require("chai");
const btoa2 = require("btoa");
const nock = require("nock");
const SymphonyCommerce = require("../dist");

const { expect } = chai;
const manageUrl = "https://manage.symphonycommerce.com";
const testSite = "testSite";
const testCredentials = {
  email: "test@test.com",
  password: "password"
}

module.exports = function(apiModule, apiPath) {
  describe(`${apiModule} - Base`, function() {
    beforeEach(() => {
      nock.cleanAll();
    });

    it("to initialize as function with no params", () => {
      const module = SymphonyCommerce()[apiModule];
      expect(module).to.be.a('function');
    });

    it("to initialize as object with params", () => {
      const module = SymphonyCommerce(testCredentials)[apiModule];


      expect(module).to.be.an('object');
      expect(module).to.have.all.keys([
        "headers",
        "logger",
        "apiPath",
        "baseUrl"
      ]);

      expect(module.apiPath).to.equal(apiPath);
      expect(module.baseUrl).to.equal(manageUrl);
    });

    it("to have correct headers with email/password", () => {
      const module = SymphonyCommerce(testCredentials)[apiModule];

      let expectedHeaders = [
        "Accept",
        "Content-Type"
      ]

      if (apiModule !== 'Auth') {
        expectedHeaders.push("Authorization");
      }

      expect(module).to.have.property("headers")
      .that.is.an("object")
      .with.all.keys(expectedHeaders);

      if (apiModule === 'Auth') {
        return;
      }

      expect(module.headers.Authorization).to.equal(`Basic ${btoa2(testCredentials.email + ":" + testCredentials.password)}`);
    });

    it("to initialize with different environments", () => {
      const moduleRelease = SymphonyCommerce(_.assign({}, testCredentials, { env: "manage-release"}))[apiModule];
      const modulePod = SymphonyCommerce(_.assign({}, testCredentials, { env: "pod-partner"}))[apiModule];
      
      expect(moduleRelease.baseUrl).to.equal('https://manage-release.symphonycommerce.com');
      expect(modulePod.baseUrl).to.equal('https://pod-partner.symphonycommerce.com');
    });
  });
}

