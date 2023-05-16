export default class APIError extends Error {
  constructor(body, response) {
    super();

    this.name = 'APIErrror';
    this.response = response;
    this.body = body;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}
