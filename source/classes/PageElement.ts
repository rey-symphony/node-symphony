///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

export default class PageElement extends APIBase {
  constructor(options: ApiOptions) { 
    options.apiPath = `/api/v1/pageElement`;
    super(options); 
  }

  getPageElements(site: string) {
    return this.get({
      site,
      endpoint: `/load`
    });
  }

  createPageElement(site: string) {
    return this.post({
      site,
      endpoint: `/create`
    });
  }

  savePageElement(site: string, pageElement: any) {
    return this.post({
      site,
      body: pageElement,
      endpoint: `/save`
    });
  }
}
