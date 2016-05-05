var expect = require("chai").expect;
var syApi = require("../dist/index")({
    email: process.env.syAPI_Email,
    password: process.env.syAPI_Password
});


describe("syApi Product API default ENV", function() {
    site = "kittyprod";
    productClusterId = 1627125;
    responseField = "name";
    responseValue = "Kitty Glasses";

	it("can request ProductCluster by id", function(done) {
		syApi.Product.getProductCluster(site, productClusterId, function(err, productCluster) {
			expect(err).to.be.null;
            expect(productCluster).to.be.ok;
			expect(productCluster[responseField]).to.equal(responseValue);
			done();
		});
	});
});
