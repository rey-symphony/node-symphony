const _ = require('lodash');


module.exports = initModule;
export default initModule;

function initModule(apiOptions: any = {}) {
  const apiClasses = {
    ASN: require("./classes/ASN"),
    Auth: require("./classes/Auth"),
    Member: require("./classes/Member"),
    Order: require("./classes/Order"),
    PageElement: require("./classes/PageElement"),
    Permission: require("./classes/Permission"),
    Product: require("./classes/Product"),
    Report: require("./classes/Report"),
    SearchSync: require("./classes/SearchSync"),
    SiteConfig: require("./classes/SiteConfig"),
    Store: require("./classes/Store"),
    Subscription: require("./classes/Subscription"),
    UrlMapping: require("./classes/UrlMapping"),
    v3Cart: require("./classes/v3Cart"),
    Variant: require("./classes/Variant"),
    Victory: require("./classes/Victory"),
    Wholesale: require("./classes/Wholesale")
  }

  _.each(apiClasses, (apiClass, apiName) => {
    if (_.isEmpty(apiOptions)) {
      apiClasses[apiName] = apiClass.default;
      return;
    }

    apiClasses[apiName] = new apiClass.default(_.clone(apiOptions, true));
  });

  return apiClasses;
}
/*module.exports = function(apiOptions) {
  var apiModules = [
    "Order", "Victory", "v3Cart", "Product", "Wholesale",
    "Store", "SiteConfig", "Report", "Member",
    "SearchSync", "UrlMapping", "PageElement",'Permission','Auth', "Subscription"
  ];

  var returnModules = {};
  _.each(apiModules, function(module) {
    apiOptions ?
      returnModules[module] = new SymphonyAPI[module](_.clone(apiOptions, true)) :
      returnModules[module] = SymphonyAPI[module];
  });

  return returnModules;
}
*/
module.exports.verifyHttps = function(req, res, next) {
  if (!req.connection.encrypted) {
    res.status(505).send("HTTP Not Supported");
    return;
  }

  next();
}

module.exports.allowOrigins = (allowedOrigins) => {
  return (req, res, next) => {
    const _ = require("lodash");
    const { origin } = req.headers;

    if (allowedOrigins && !_.contains(allowedOrigins, origin)) {
      res.status(403).send("Origin: " + origin + " Not Allowed");
      return;
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-SPSESSION');
    res.header('Access-Control-Allow-Origin', '*');
    next();
  }
}

module.exports.managePermissions = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  const site = req.params.site || req.query.site || (req.body && req.body.site);
  const Symphony = require("node-symphony")({
    basicAuth: req.get("Authorization"),
    cookieAuth: req.get("X-SPSESSION"),
    env: req.query.env,
  });

  Symphony.Member.checkPermissions(site).then((result) => {
    if (result.hasPermissions) {
      req.permissions = result;
      next();
    } else {
      res.status(403).send({message: 'Forbidden - Bad Authentication'});
    }
  }, (fail) => {
    const failError = fail.error || {};
    res.status(fail.error.code || 403).send(failError);
  });
}

