///<reference path='../interfaces/ApiOptions.ts'/>
import APIBase from './APIBase';
const _ = require ('lodash');

export default class Member extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/api/v1/member`;
    super(options);
  }

  getMember(site: string, id: number) {
    return this.get({
      site,
      endpoint: `/${id}`
    });
  }

  addCredits(site: string, memberId: number, delta: number) {
    return this.post({
      site,
      endpoint: `/${memberId}/credit`,
      queryParams: {
        amount: delta
      }
    });
  }

  isUserLoggedIntoSite(site: string, domain: string) {
    return this.get({
      site,
      baseUrl: domain,
      apiPath: "/member",
      overrideBaseUrl: true
    }).then((body) => {
      if (!body || body.purchasingChannel.subdomain !== site) {
        return false;
      }

      return body;
    });
  }

  checkPermissions(site: string) {
    return this.get({
      site
    }).then((body) => {
      return {
        memberId: body ? body.id : null,
        memberEmail: body ? body.email : null,
        hasPermissions: _.contains(body ? body.organizationsWithSite : null, site),
        isSymphonyEmployee: _.contains(body ? body.email : null, `symphonycommerce`)
      }
    });
  }

  logInToManage(site: string, email: string, password: string, subscribe: boolean) {
    return this.post({
      site,
      includeResponse: true,
      apiPath: `/auth/email/login`,
      queryParams: {
        email: email,
        password: password,
        subscribe: subscribe
      },
      overrideBaseUrl: true
    });
  }

  findOrCreate(site: string, email: string) {
    return this.post({
      site,
      body: email,
      json: false,
      endpoint: `/anonymous`
    });
  }
}
