var expect = require("chai").expect;
describe("Symphony API default ENV", function() {
	describe("syApi Email/Password Credentials", function() {
  		it("has environment email", function() {
  			expect(process.env.syAPI_Email).to.not.equal(null);
  		});

  		it("has environment password", function() {
  			expect(process.env.syAPI_Password).to.not.equal(null);
  		});
  	});

	//use the email/password
	var syApi = require("../dist/index")({
		email: process.env.syAPI_Email,
		password: process.env.syAPI_Password
	});

	describe("syApi Object", function() {
    	it("has OrderApi", function() {
    		expect(syApi).to.have.property('Order');
    	});

      it("has Order.apiPath", function() {
        expect(syApi.Order.apiPath).to.equal('/api/v1/order');
      });

      it("has Order.baseUrl", function() {
        expect(syApi.Order.baseUrl).to.equal('https://manage.symphonycommerce.com');
      });

    	it("has ProductApi", function() {
    		expect(syApi).to.have.property('Product');
    	});

      it("has Product.baseUrl", function() {
        expect(syApi.Product.baseUrl).to.equal('https://manage.symphonycommerce.com');
      });

      it("has Product.apiPath", function() {
        expect(syApi.Product.apiPath).to.equal('/api/v1/productcluster');
      });

    	it("has ReportApi", function() {
    		expect(syApi).to.have.property('Report');
    	});

      it("has Report.baseUrl", function() {
        expect(syApi.Report.baseUrl).to.equal('https://manage.symphonycommerce.com');
      });

      it("has Report.apiPath", function() {
        expect(syApi.Report.apiPath).to.equal('/api/v1/reports');
      });

    	it("has MemberApi", function() {
    		expect(syApi).to.have.property('Member');
    	});

      it("has Member.baseUrl", function() {
        expect(syApi.Member.baseUrl).to.equal('https://manage.symphonycommerce.com');
      });

      it("has Member.apiPath", function() {
        expect(syApi.Member.apiPath).to.equal('/api/v1/member');
      });
	});
});

