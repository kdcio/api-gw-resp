import { OpsInput, OpsErrorInput, BuildOutput } from './interfaces';
import buildResponse from './build';
import buildErrorResponse from './build-error';

/** Successful operation */
const OK = (opts: OpsInput): BuildOutput =>
  buildResponse({ statusCode: 200, ...opts });
const CREATED = (opts: OpsInput): BuildOutput =>
  buildResponse({ statusCode: 201, ...opts });
const NO_CONTENT = (opts?: OpsInput): BuildOutput =>
  buildResponse({ statusCode: 204, ...opts, body: null });

const BAD_REQUEST = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: 400, ...opts });
const UNAUTHORIZED = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: 401, ...opts });
const FORBIDDEN = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: 403, ...opts });
const NOT_FOUND = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: 404, ...opts });
const CONFLICT = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: 409, ...opts });
const SERVER_ERROR = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: 500, ...opts });

/** SUccessful response via method */
const GET = (opts: OpsInput) => OK(opts);
const POST = (opts: OpsInput) => CREATED(opts);
const PUT = (opts: OpsInput) => NO_CONTENT(opts);
const DELETE = (opts: OpsInput) => NO_CONTENT(opts);

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
