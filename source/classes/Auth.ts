///<reference path='APIBase.ts'/>
///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class Auth extends APIBase {
  constructor(options: ApiOptions) {
    options.apiPath = `/auth`;
    options.email = null;
    options.password = null;
    super(options);
  }

  registerMember(email: string, password:string) {
    return this.post({
      site: null,
      overrideBaseUrl: true,
      queryParams: {
        email, 
        password, 
        subscribe: true
      },
      endpoint: `/email/register`
    });
  }
}



