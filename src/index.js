import buildResponse from './build';
import buildErrorResponse from './build-error';

/** Successful operation */
const OK = (opts = {}) => buildResponse({ statusCode: 200, ...opts });
const CREATED = (opts = {}) => buildResponse({ statusCode: 201, ...opts });
const NO_CONTENT = (opts = {}) =>
  buildResponse({ statusCode: 204, ...opts, body: null });

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

const response = {
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

export default response;
