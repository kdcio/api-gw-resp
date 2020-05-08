# API Gateway Response Builder

![ver](https://img.shields.io/npm/v/@kdcsoftware/api-gw-resp?style=for-the-badge)
![build](https://img.shields.io/github/workflow/status/kdcsoftware/api-gw-resp/build?style=for-the-badge)
![codecov](https://img.shields.io/codecov/c/github/kdcsoftware/api-gw-resp?style=for-the-badge)
![size](https://img.shields.io/bundlephobia/min/@kdcsoftware/api-gw-resp?style=for-the-badge)
![license](https://img.shields.io/github/license/kdcsoftware/api-gw-resp?style=for-the-badge)

This module will help you build a valid API Gateway response from your lambda function.

## Install

```bash
npm i @kdcsoftware/api-gw-resp
```

## Usage

```js
const response = require('@kdcsoftware/api-gw-resp');

module.exports = (event) => {
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

## Methods

1. OK
2. CREATED
3. NO_CONTENT
4. BAD_REQUEST
5. UNAUTHORIZED
6. FORBIDDEN
7. NOT_FOUND
8. CONFLICT
9. SERVER_ERROR
10. GET (alias of OK)
11. POST (alias of CREATED)
12. PUT (alias of NO_CONTENT)
13. DELETE (alias of NO_CONTENT)

## API

All of the methods have the same API.

| Option  | Default | Description                                                                                                                     |
| ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| body    | null    | JS object that will converted into JSON string. If present, a _Content-Type_ of _application/json_ will be added to the header. |
| cors    | true    | Add cors in header                                                                                                              |
| headers | {}      | Additional headers                                                                                                              |

## Examples

```js
const parser = require('@kdcsoftware/api-gw-req');
const response = require('@kdcsoftware/api-gw-resp');
const db = require('./db');

module.exports = async (event) => {
  const request = parser(event);
  let body = null;

  if (event.method === 'GET') {
    try {
      const movies = db.listMovies();
      return response.GET({ body: { movies } });
    } catch (e) {
      return response.BAD_REQUEST({ body: e });
    }
  } else if (event.method === 'POST') {
    try {
      const id = await db.insertMove(request.body);
      return response.POST({ body: { id } });
    } catch (e) {
      return response.BAD_REQUEST({ body: e });
    }
  } else if (event.method === 'PUT') {
    try {
      await db.updateMove(request.body);
      return response.PUT();
    } catch (e) {
      return response.CONFLICT({ body: e });
    }
  }

  return response.BAD_REQUEST({
    body: {
      message: 'Invalid method',
    },
  });
};
```

## See also

[@kdcsoftware/api-gw-req](https://github.com/kdcsoftware/api-gw-req)
