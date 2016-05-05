var expect = require("chai").expect;
var request = function(options, callback) {
    switch (options.method) {
        case "GET":
            callback("success GET request");
        break;
    }
}
request.get = function() {
    //test
}

request.put = function() {
    //test
}

request.post = function() {
    //test
}
/*var options: RequestOptions = {
      method: RequestMethod[RequestMethod[type]],
      baseUrl: this.baseUrl + '/org/' + params.site,
      uri: this.apiPath + (params.endpoint || ""),
      qs: params.queryParams || "",
      json: true,
      body: params.body,
      form: params.form
    }
*/



var syApi = require("../dist/index")({
    email: "hellokitty@symphonycommerce.com",
    password: "rightmeow123",
    request: request

});



describe("syApi Order API", function() {
    var site = "kittyprod";
    var orderId = 1762319;
    var query = "riley";
    var responseField = "email";
    var responseValue = "riley@symphonycommerce.com";
    var limit = 1;

    describe(" ~ UNIT TESTS ~", function(done) {
        var errById;
        var orderById;
console.log(syApi.Order);
        /*before(function(done){

            syApi.Order.getOrder(site, orderId, function(err, order) {
                errById = err;
                orderById = order;
                done();
            });
        });
        });*/

        it("returns err undefined", function() {
            expect(errById).to.not.exist;
        });

        it("returns order object", function() {
            expect(orderById).to.be.ok;
        });

        it("returns order " + responseField, function() {
            expect(orderById.data.customer[responseField]).to.equal(responseValue);
        });
	});




    describe("Order Search (valid query, default options)", function() {
        var errSearch;
        var orderSearch;

        before(function(done){
            syApi.Order.searchOrders(site, query, function(err, orders) {
                errSearch = err;
                orderSearch = orders;
                done();
            });
        });

        it("returns err undefined", function() {
            expect(errSearch).to.not.exist;
        });

        it("returns results object", function() {
            expect(orderSearch.results).to.ok;
        });

        it("returns results > 0y", function() {
            expect(orderSearch.size).to.be.above(0);
        });
    });

    describe("Order Search (valid query, LIMIT = 1)", function() {
        var errLimit;
        var orderLimit;

        before(function(done){
            syApi.Order.searchOrders(site, query, function(err, orders) {
                errLimit = err;
                orderLimit = orders;
                done();
            }, { limit: limit });
        });

        it("returns err undefined", function() {
            expect(errLimit).to.not.exist;
        });

        it("returns results object", function() {
            expect(orderLimit.results).to.ok;
        });

        it("returns results size = " + limit, function() {
            expect(orderLimit.size).to.equal(limit);
        });
    });

    describe("404 ERROR scenarios ~ malformed orderId", function() {
        var err404;
        var order404;

        before(function(done){
            syApi.Order.getOrder(site, "404ERROR", function(err, order) {
                err404 = err;
                order404 = order;
                done();
            });
        });

        it("retunrs err undefined", function() {
            expect(err404).to.exist;
        });

        it("returns 404 reason", function() {
            expect(err404.reason).to.equal(404);
        });

        it("returns order undefined", function() {
            expect(order404).to.not.exist;
        });
    });

    describe("500 ERROR scenarios ~ valid order id not found", function() {
        var err500;
        var order500;

        before(function(done){
            syApi.Order.getOrder(site, 500, function(err, order) {
                err500 = err;
                order500 = order;
                done();
            });
        });

        it("returns err undefined", function() {
            expect(err500).to.exist;
        });

        it("returns 500 reason", function() {
            expect(err500.reason).to.equal(500);
        });

        it("returns order undefined", function() {
            expect(order500).to.not.exist;
        });
    });
});

