///<reference path="../node.d.ts"/>
///<reference path="../interfaces/ApiParams.ts"/>
///<reference path="../interfaces/ApiOptions.ts"/>
///<reference path="../interfaces/ApiHeaders.ts"/>
///<reference path="../interfaces/RequestOptions.ts"/>

const btoa2 = require(`btoa`);
const request = require(`request-promise`);

export default class APIBase implements ApiOptions {
  env: string;
  apiPath: string;
  authType: string;
  headers: ApiHeaders;
  baseUrl: string;
  logger: any;

  constructor(apiOptions: ApiOptions) {
    let manageEnv = apiOptions.env || `manage`;
    this.headers = {
      "Accept": `application/json`,
      "Content-Type": `application/json`
    };

    this.logger = apiOptions.logger ? apiOptions.logger : console;
    this.apiPath = apiOptions.apiPath;
    this.baseUrl = `https://${manageEnv}.symphonycommerce.com`;

    if (apiOptions.basicAuth) {
      this.headers[`Authorization`] = apiOptions.basicAuth;
      return;
    }

    if (apiOptions.email && apiOptions.password) {
      this.headers[`Authorization`] = `Basic ` + btoa2(apiOptions.email + `:` + apiOptions.password);
      return;
    }

    if (apiOptions.sessionId) {
      this.headers[`Cookie`] = `SPSESSIONID=${apiOptions.sessionId}`;
      return;
    } 

    if (apiOptions.cookieAuth) {
      this.headers[`Cookie`] = apiOptions.cookieAuth;
      return;
    }
  }

  get(params: ApiParams) {
    var options: RequestOptions = {
      method: `GET`,
      baseUrl: params.overrideBaseUrl ? (params.baseUrl || this.baseUrl) : 
              `${this.baseUrl}/org/${params.site}`,
      uri: (params.apiPath || this.apiPath) + (params.endpoint || ``),
      qs: params.queryParams || ``,
      json: true
    }

    return this.doRequest(options);
  }

  put(params: ApiParams) {
    return this.putPost(`PUT`, params);
  }

  post(params: ApiParams) {
    return this.putPost(`POST`, params);
  }

  private putPost(type: string, params: ApiParams) {
    var options = {
      method: type,
      baseUrl: params.overrideBaseUrl ? this.baseUrl : `${this.baseUrl}/org/${params.site}`,
      uri: (params.apiPath || this.apiPath) + (params.endpoint || ""),
      qs: params.queryParams || "",
      resolveWithFullResponse: params.includeResponse,
      json: typeof params.json === 'undefined' ? true : params.json,
      body: params.body,
      form: params.form
    };

    return this.doRequest(options);
  }

  doRequest(options: RequestOptions) {
    this.logger.info(`[ ${options.method} ] : ` + options.uri);
    //request.debug = true;
    options.headers = this.headers;
    return request(options);
  }
}
