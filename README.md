# API Gateway Response Builder

This module will help you build a valid API Gateway response from your lambda function.

[![ver](https://img.shields.io/npm/v/@kdcio/api-gw-resp)](https://www.npmjs.com/package/@kdcio/api-gw-resp) [![size](https://badgen.net/bundlephobia/minzip/@kdcio/api-gw-resp)](https://bundlephobia.com/result?p=@kdcio/api-gw-resp) [![build](https://img.shields.io/github/workflow/status/kdcio/api-gw-resp/build)](https://github.com/kdcio/api-gw-resp/actions?query=workflow%3Abuild) [![Known Vulnerabilities](https://snyk.io/test/github/kdcio/api-gw-resp/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kdcio/api-gw-resp?targetFile=package.json) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kdcio_api-gw-resp&metric=alert_status)](https://sonarcloud.io/dashboard?id=kdcio_api-gw-resp) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=kdcio_api-gw-resp&metric=code_smells)](https://sonarcloud.io/dashboard?id=kdcio_api-gw-resp) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kdcio_api-gw-resp&metric=coverage)](https://sonarcloud.io/dashboard?id=kdcio_api-gw-resp) [![license](https://img.shields.io/github/license/kdcio/api-gw-resp)](https://github.com/kdcio/api-gw-resp/blob/master/LICENSE)

## Install

```bash
npm i @kdcio/api-gw-resp
```

## Usage

```js
import response from '@kdcio/api-gw-resp';

export const listMovies = (event) => {
  const body = {
    movies: [
      { name: 'Lord of the Rings' },
      { name: 'Forest Gump' },
      { name: 'Breaveheart' },
    ],
  };
  return response.OK({ body });
};
```

The function above will return

```json
{
  "statusCode": 200,
  "isBase64Encoded": false,
  "headers": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "*"
  },
  "body": "{\"movies\":[{\"name\":\"Lord of the Rings\"},{\"name\":\"Forest Gump\"},{\"name\":\"Breaveheart\"}]}"
}
```

## API

### Successful responses

| Method     | Code | Description                                                                                                                 |
| ---------- | ---- | --------------------------------------------------------------------------------------------------------------------------- |
| OK         | 200  | Request has succeeded and the message body contains the requested information.                                              |
| CREATED    | 201  | Request has succeeded and a new resource has been created. The message body may contain information about the new resource. |
| NO_CONTENT | 204  | Request has succeeded but there is no content to be returned.                                                               |

Options

| Option  | Type                   | Required                | Default | Description                                                                                                                                                                                                      |
| ------- | ---------------------- | ----------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body    | object, string or null | :ballot_box_with_check: | null    | <ul><li>**object** will be converted into JSON string and will have a _Content-Type_ of _application/json_ in the header.</li><li>**string** will have a _Content-Type_ of _text/plain_ in the header.</li></ul> |
| cors    | bool                   | :ballot_box_with_check: | true    | If true, will add cors in header                                                                                                                                                                                 |
| origin  | string                 | :ballot_box_with_check: | \*      | Set specific origin                                                                                                                                                                                              |
| headers | object                 | :ballot_box_with_check: | {}      | Specify additional headers                                                                                                                                                                                       |

Examples:

```js
response.OK({ body: { name: 'John Doe' } });
response.CREATED({ body: { id: 1 } });
response.NO_CONTENT();
```

### Redirect responses

| Method   | Code       | Description                                                                                     |
| -------- | ---------- | ----------------------------------------------------------------------------------------------- |
| REDIRECT | 301 or 302 | The URI of the requested resource has moved. The new URI can be found in the _Location_ header. |

Options

| Option    | Type   | Required                | Default | Description                                                 |
| --------- | ------ | ----------------------- | ------- | ----------------------------------------------------------- |
| permanent | bool   | :ballot_box_with_check: | none    | If true, status code will be 301. Otherwise it will be 302. |
| location  | bool   | :ballot_box_with_check: | none    | The new url where the resource has been moved.              |
| headers   | object | :ballot_box_with_check: | {}      | Specify additional headers                                  |

Examples:

```js
response.REDIRECT({
  permanent: true,
  location: 'https://www.google.com',
});
```

### Client Error responses

| Method       | Code | Description                                                                                                           |
| ------------ | ---- | --------------------------------------------------------------------------------------------------------------------- |
| BAD_REQUEST  | 400  | The server could not understand the request due to invalid syntax or missing parameters.                              |
| UNAUTHORIZED | 401  | The client must authenticate itself to get the requested response.                                                    |
| FORBIDDEN    | 403  | The client is not allowed to access the requested resource. Unlike 401, the client's identity is known to the server. |
| NOT_FOUND    | 404  | The server can not find the requested resource.                                                                       |
| CONFLICT     | 409  | This response is sent when a request conflicts with the current state of the server. Usually duplicate of data.       |

Options

| Option  | Type   | Required                | Default          | Description   |
| ------- | ------ | ----------------------- | ---------------- | ------------- |
| error   | string | :ballot_box_with_check: | Status code name | Error name    |
| message | string | :white_check_mark:      | none             | Error message |

Examples:

```js
response.BAD_REQUEST({ message: 'Missing username' });
response.UNAUTHORIZED({
  message: 'You need to login to access this resource.',
});
response.FORBIDDEN({ message: 'You are not allowed to access this resource.' });
response.NOT_FOUND({ message: 'Resource not found.' });
response.CONFLICT({ message: 'Duplicate username.' });
```

### Server Error responses

| Method       | Code | Description                                                           |
| ------------ | ---- | --------------------------------------------------------------------- |
| SERVER_ERROR | 500  | The server has encountered a situation it doesn't know how to handle. |

Options

| Option  | Type   | Required                | Default               | Description   |
| ------- | ------ | ----------------------- | --------------------- | ------------- |
| error   | string | :ballot_box_with_check: | Internal Server Error | Error name    |
| message | string | :white_check_mark:      | none                  | Error message |

Examples:

```js
response.SERVER_ERROR({ message: 'Internal server error.' });
```

### Auto Detect Error responses

| Method | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| ERROR  | This will auto detect which error code to send based on the message. |

Options

| Option  | Type   | Required           | Default | Description   |
| ------- | ------ | ------------------ | ------- | ------------- |
| message | string | :white_check_mark: | none    | Error message |

Error Messages

| Error Response | Regex matcher               |
| -------------- | --------------------------- |
| BAD_REQUEST    | `/missing\|invalid/i`       |
| UNAUTHORIZED   | `/unauthorized/i`           |
| FORBIDDEN      | `/forbidden\|not allowed/i` |
| NOT_FOUND      | `/not found/i`              |
| CONFLICT       | `/conflict\|duplicate/i`    |

Examples:

```js
try {
  throw new Error('Missing username');
} catch (e) {
  // This will return status code 400 (BAD_REQUEST)
  return response.ERROR({ message: e.message });
}
```

## More Examples

```js
import parser from '@kdcio/api-gw-resp';
import response from '@kdcio/api-gw-resp';
import db from './db';

export const movie = async (event) => {
  const request = parser(event);
  let body = null;

  if (event.method === 'GET') {
    try {
      const movies = db.listMovies();
      return response.OK({ body: { movies } });
    } catch (e) {
      return response.BAD_REQUEST({ message: e.message });
    }
  } else if (event.method === 'POST') {
    try {
      const id = await db.insertMove(request.body);
      return response.OK({ body: { id } });
    } catch (e) {
      return response.BAD_REQUEST({ message: e.message });
    }
  } else if (event.method === 'PUT') {
    try {
      await db.updateMove(request.body);
      return response.NO_CONTENT();
    } catch (e) {
      return response.CONFLICT({ message: e.message });
    }
  }

  return response.BAD_REQUEST({
    message: 'Invalid method',
  });
};
```

Using `ERROR` method:

```js
import parser from '@kdcio/api-gw-resp';
import response from '@kdcio/api-gw-resp';
import db from './db';

export const movie = async (event) => {
  const request = parser(event);
  let body = null;

  try {
    if (event.method === 'GET') {
      const movies = db.listMovies();
      return response.OK({ body: { movies } });
    } else if (event.method === 'POST') {
      const id = await db.insertMove(request.body);
      return response.OK({ body: { id } });
    } else if (event.method === 'PUT') {
      await db.updateMove(request.body);
      return response.NO_CONTENT();
    } else {
      throw new Error('Invalid method');
    }
  } catch (e) {
    // Will determine the correct status code based on the error message
    return response.ERROR({ message: e.message });
  }
};
```

## Star Me

If you find this project useful, please consider giving a star. I would really appreciate it.

You can also:

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/default-yellow.png)](https://www.buymeacoffee.com/o4f0WYV)

## See also

[@kdcio/api-gw-resp](https://github.com/kdcio/api-gw-resp)

## License

[MIT](LICENSE)
