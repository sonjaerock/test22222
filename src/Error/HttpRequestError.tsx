export class HttpRequestError {
    private type: string;
    private error: Error | null;

    constructor(Error: Error) {
        this.type = 'http_request_error'
        this.error = Error;
    }
}