import 'regenerator-runtime/runtime';
import { response, RESP_TEMPLATE } from '../src/index';

describe('Build response', () => {
  [
    {
      description: 'OK response',
      method: 'OK',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'hello world' }),
      },
    },
    {
      description: 'OK response no body',
      method: 'OK',
      expected: { ...RESP_TEMPLATE },
    },
    {
      description: 'OK response string body',
      method: 'OK',
      body: 'pong',
      expected: {
        ...RESP_TEMPLATE,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'text/plain',
        },
        body: 'pong',
      },
    },
    {
      description: 'CREATED response',
      method: 'CREATED',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 201,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'hello world' }),
      },
    },
    {
      description: 'CREATED response no body',
      method: 'CREATED',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 201,
      },
    },
    {
      description: 'NO_CONTENT response body ignored',
      method: 'NO_CONTENT',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
    {
      description: 'NO_CONTENT response no body',
      method: 'NO_CONTENT',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
    {
      description: 'BAD_REQUEST response',
      method: 'BAD_REQUEST',
      errorMsg: 'my bad',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 400,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'my bad' }),
      },
    },
    {
      description: 'BAD_REQUEST response no body',
      method: 'BAD_REQUEST',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 400,
      },
    },
    {
      description: 'UNAUTHORIZED response',
      method: 'UNAUTHORIZED',
      errorMsg: 'wrong password',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 401,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'wrong password' }),
      },
    },
    {
      description: 'UNAUTHORIZED response no body',
      method: 'UNAUTHORIZED',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 401,
      },
    },
    {
      description: 'FORBIDDEN response',
      method: 'FORBIDDEN',
      errorMsg: 'no permission',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 403,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'no permission' }),
      },
    },
    {
      description: 'FORBIDDEN response no body',
      method: 'FORBIDDEN',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 403,
      },
    },
    {
      description: 'NOT_FOUND response',
      method: 'NOT_FOUND',
      errorMsg: 'no here',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 404,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'no here' }),
      },
    },
    {
      description: 'NOT_FOUND response no body',
      method: 'NOT_FOUND',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 404,
      },
    },
    {
      description: 'CONFLICT response',
      method: 'CONFLICT',
      errorMsg: 'you are late',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 409,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'you are late' }),
      },
    },
    {
      description: 'CONFLICT response no body',
      method: 'CONFLICT',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 409,
      },
    },
    {
      description: 'SERVER_ERROR response',
      method: 'SERVER_ERROR',
      errorMsg: 'ooopss',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 500,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'ooopss' }),
      },
    },
    {
      description: 'SERVER_ERROR response no body',
      method: 'SERVER_ERROR',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 500,
      },
    },
    {
      description: 'GET response',
      method: 'GET',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 200,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'hello world' }),
      },
    },
    {
      description: 'GET response no body',
      method: 'GET',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 200,
      },
    },
    {
      description: 'POST response',
      method: 'POST',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 201,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'hello world' }),
      },
    },
    {
      description: 'POST response no body',
      method: 'POST',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 201,
      },
    },
    {
      description: 'PUT response',
      method: 'PUT',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
    {
      description: 'PUT response no body',
      method: 'PUT',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
    {
      description: 'DELETE response',
      method: 'DELETE',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
    {
      description: 'DELETE response no body',
      method: 'DELETE',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
  ].forEach(({ description, method, body, errorMsg, expected }) => {
    test(description, async () => {
      let request;
      if (body) request = response[method]({ body });
      else if (errorMsg) request = response[method]({ message: errorMsg });
      else request = response[method]();
      if (expected) {
        expect(request).toEqual(expected);
      }
    });
  });

  test('GET with no cors', async () => {
    const request = response.OK({
      body: { message: 'hello world' },
      cors: false,
    });

    expect(request).toEqual({
      ...RESP_TEMPLATE,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'hello world' }),
    });
  });
});
