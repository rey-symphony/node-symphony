interface RequestOptions {
    uri: string;
    baseUrl: string;
    method: string;
    qs?: Object;
    resolveWithFullResponse?: boolean;
    headers?: ApiHeaders;
    json: boolean;
    body?: Object;
    form?: Object;
}

