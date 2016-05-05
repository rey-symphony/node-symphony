var expect = require("chai").expect;
var syApi = require("../dist/index")({
    email: process.env.syAPI_Email,
    password: process.env.syAPI_Password
});

describe("syApi Member API default ENV", function() {
    var site = "kittyprod";
    var memberId = 3827170;
    var responseField = "email";
    var responseValue = "riley@symphonycommerce.com";

	it("can request Member by id", function(done) {
		syApi.Member.getMember(site, memberId, function(err, member) {
			console.log(err);
			expect(err).to.be.null;
            expect(member).to.be.ok;
			expect(member[responseField]).to.equal(responseValue);
			done();
		});
	});
});
