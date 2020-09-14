/* eslint-disable max-lines */
import STATUS from './constants/status';
import {
  OpsInput,
  OpsRedirectInput,
  OpsErrorInput,
  BuildOutput,
} from './interfaces';
import buildResponse from './build';
import buildErrorResponse from './build-error';

/** Successful operation */
const OK = (opts: OpsInput): BuildOutput =>
  buildResponse({ statusCode: STATUS.OK, ...opts });
const CREATED = (opts: OpsInput): BuildOutput =>
  buildResponse({ statusCode: STATUS.CREATED, ...opts });
const NO_CONTENT = (opts?: OpsInput): BuildOutput =>
  buildResponse({ statusCode: STATUS.NO_CONTENT, ...opts, body: null });
const REDIRECT = ({ permanent, ...opts }: OpsRedirectInput) =>
  buildResponse({
    statusCode: permanent ? STATUS.REDIRECT_PERM : STATUS.REDIRECT_TEMP,
    ...opts,
    body: null,
  });

const BAD_REQUEST = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.BAD_REQUEST, ...opts });
const UNAUTHORIZED = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.UNAUTHORIZED, ...opts });
const FORBIDDEN = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.FORBIDDEN, ...opts });
const NOT_FOUND = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.NOT_FOUND, ...opts });
const CONFLICT = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.CONFLICT, ...opts });
const SERVER_ERROR = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.SERVER_ERROR, ...opts });

/** SUccessful response via method */
const GET = (opts: OpsInput) => OK(opts);
const POST = (opts: OpsInput) => CREATED(opts);
const PUT = (opts: OpsInput) => NO_CONTENT(opts);
const DELETE = (opts: OpsInput) => NO_CONTENT(opts);

const response = Object.freeze({
  OK,
  CREATED,
  NO_CONTENT,
  REDIRECT,
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
});

export default response;
