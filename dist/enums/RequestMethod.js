var RequestMethod;
(function (RequestMethod) {
    RequestMethod[RequestMethod["POST"] = 0] = "POST";
    RequestMethod[RequestMethod["GET"] = 1] = "GET";
    RequestMethod[RequestMethod["DELETE"] = 2] = "DELETE";
    RequestMethod[RequestMethod["PUT"] = 3] = "PUT";
})(RequestMethod || (RequestMethod = {}));
