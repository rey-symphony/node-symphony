///<reference path="../interfaces/ApiOptions.ts"/>
import APIBase from './APIBase';

const _ = require('lodash');


export default class Permission extends APIBase {
    constructor(options: ApiOptions) {
      options.apiPath = `/api/v1/access`;
      super(options);
    }

    getAllPermissions() {
      return this.get({
        site: `partner`,
        endpoint: `/group/all`,
        queryParams: {
          excludeNonSelectable: true
        }
      });
    }

    getMemberAllPermissions(memberId: number) {
      return this.get({
        site: `partner`,
        endpoint: `/member/${memberId}/access-groups`
      });
    }

    updatePermissions(memberId: number, accessGroupIds: Array<number>) {
      return this.put({
        site: `partner`,
        body: { accessGroupIds },
        endpoint: `/member/${memberId}/access-groups`
      });
    }
}

