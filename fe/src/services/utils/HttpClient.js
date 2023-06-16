import APIError from '../../errors/APIError';
import delay from '../../utils/delay';

class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  async post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  async makeRequest(path, options) {
    await delay(2000);

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      headers.entries().forEach(({ name, value }) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');
    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(responseBody, response);
  }
}

export default HttpClient;
