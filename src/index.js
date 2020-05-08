export const RESP_TEMPLATE = {
  statusCode: 200,
  isBase64Encoded: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
  },
  body: null,
};

const buildResponse = ({
  statusCode,
  body,
  cors = true,
  headers = {},
  ...opts
}) => {
  const response = {
    ...RESP_TEMPLATE,
    headers:
      cors === false
        ? { ...headers }
        : { ...RESP_TEMPLATE.headers, ...headers },
    ...opts,
    statusCode,
  };

  if (body) {
    response.body = JSON.stringify(body);
    response.headers['Content-Type'] = 'application/json';
  }

  return response;
};

/** Successful operation */
const OK = (opts = {}) => buildResponse({ statusCode: 200, ...opts });
const CREATED = (opts = {}) => buildResponse({ statusCode: 201, ...opts });
const NO_CONTENT = (opts = {}) =>
  buildResponse({ statusCode: 204, ...opts, body: null });

/** Failed operation */
const BAD_REQUEST = (opts = {}) => buildResponse({ statusCode: 400, ...opts });
const UNAUTHORIZED = (opts = {}) => buildResponse({ statusCode: 401, ...opts });
const FORBIDDEN = (opts = {}) => buildResponse({ statusCode: 403, ...opts });
const NOT_FOUND = (opts = {}) => buildResponse({ statusCode: 404, ...opts });
const CONFLICT = (opts = {}) => buildResponse({ statusCode: 409, ...opts });
const SERVER_ERROR = (opts = {}) => buildResponse({ statusCode: 500, ...opts });

/** SUccessful response via method */
const GET = (opts) => OK(opts);
const POST = (opts = {}) => CREATED(opts);
const PUT = (opts = {}) => NO_CONTENT(opts);
const DELETE = (opts = {}) => NO_CONTENT(opts);

export default {
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  GET,
  POST,
  PUT,
  DELETE,
};
