import STATUS from './constants/status';
import { ERR_MSGS } from './constants/errors';
import { OpsErrorInput, BuildOutput } from './interfaces';
import buildErrorResponse from './buildErrorResponse';

export const BAD_REQUEST = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.BAD_REQUEST, ...opts });
export const UNAUTHORIZED = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.UNAUTHORIZED, ...opts });
export const FORBIDDEN = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.FORBIDDEN, ...opts });
export const NOT_FOUND = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.NOT_FOUND, ...opts });
export const CONFLICT = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.CONFLICT, ...opts });
export const SERVER_ERROR = (opts: OpsErrorInput): BuildOutput =>
  buildErrorResponse({ statusCode: STATUS.SERVER_ERROR, ...opts });

export const ERROR = (opts: OpsErrorInput): BuildOutput => {
  const status = ERR_MSGS.find((err) => err.regex.test(opts.message));
  return buildErrorResponse({
    statusCode: status?.status || STATUS.SERVER_ERROR,
    ...opts,
  });
};
