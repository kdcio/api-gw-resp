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

  if (body && typeof body === 'object') {
    response.body = JSON.stringify(body);
    response.headers['Content-Type'] = 'application/json';
  } else if (body && typeof body === 'string') {
    response.body = body;
    response.headers['Content-Type'] = 'text/plain';
  }

  return response;
};

/** Successful operation */
const OK = (opts = {}) => buildResponse({ statusCode: 200, ...opts });
const CREATED = (opts = {}) => buildResponse({ statusCode: 201, ...opts });
const NO_CONTENT = (opts = {}) =>
  buildResponse({ statusCode: 204, ...opts, body: null });

/** Failed operation */
const buildErrorResponse = ({ message, ...opts }) => {
  if (message) return buildResponse({ ...opts, body: { error: message } });
  return buildResponse({ ...opts });
};
const BAD_REQUEST = (opts = {}) =>
  buildErrorResponse({ statusCode: 400, ...opts });
const UNAUTHORIZED = (opts = {}) =>
  buildErrorResponse({ statusCode: 401, ...opts });
const FORBIDDEN = (opts = {}) =>
  buildErrorResponse({ statusCode: 403, ...opts });
const NOT_FOUND = (opts = {}) =>
  buildErrorResponse({ statusCode: 404, ...opts });
const CONFLICT = (opts = {}) =>
  buildErrorResponse({ statusCode: 409, ...opts });
const SERVER_ERROR = (opts = {}) =>
  buildErrorResponse({ statusCode: 500, ...opts });

/** SUccessful response via method */
const GET = (opts) => OK(opts);
const POST = (opts = {}) => CREATED(opts);
const PUT = (opts = {}) => NO_CONTENT(opts);
const DELETE = (opts = {}) => NO_CONTENT(opts);

export const response = {
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
