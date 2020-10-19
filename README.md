# API Gateway Response Builder

This module will help you build a valid API Gateway response from your lambda function.

[![ver](https://img.shields.io/npm/v/@kdcio/api-gw-resp)](https://www.npmjs.com/package/@kdcio/api-gw-resp) [![size](https://badgen.net/bundlephobia/minzip/@kdcio/api-gw-resp)](https://bundlephobia.com/result?p=@kdcio/api-gw-resp)
[![build](https://img.shields.io/github/workflow/status/kdcio/api-gw-resp/build)](https://github.com/kdcio/api-gw-resp/actions?query=workflow%3Abuild) [![Known Vulnerabilities](https://snyk.io/test/github/kdcio/api-gw-resp/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kdcio/api-gw-resp?targetFile=package.json) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kdcio_api-gw-resp&metric=alert_status)](https://sonarcloud.io/dashboard?id=kdcio_api-gw-resp) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=kdcio_api-gw-resp&metric=code_smells)](https://sonarcloud.io/dashboard?id=kdcio_api-gw-resp) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kdcio_api-gw-resp&metric=coverage)](https://sonarcloud.io/dashboard?id=kdcio_api-gw-resp)
[![license](https://img.shields.io/github/license/kdcio/api-gw-resp)](https://github.com/kdcio/api-gw-resp/blob/master/LICENSE)

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

## Methods

1. OK
2. CREATED
3. NO_CONTENT
4. REDIRECT
5. BAD_REQUEST
6. UNAUTHORIZED
7. FORBIDDEN
8. NOT_FOUND
9. CONFLICT
10. SERVER_ERROR
11. GET (alias of OK)
12. POST (alias of CREATED)
13. PUT (alias of NO_CONTENT)
14. DELETE (alias of NO_CONTENT)

## API

All of the methods have the same API.

| Option  | Default | Description                                                                                                                     |
| ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| body    | null    | JS object that will converted into JSON string. If present, a _Content-Type_ of _application/json_ will be added to the header. |
| cors    | true    | Add cors in header                                                                                                              |
| headers | {}      | Additional headers                                                                                                              |

## Examples

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

[@kdcio/api-gw-resp](https://github.com/kdcio/api-gw-resp)
