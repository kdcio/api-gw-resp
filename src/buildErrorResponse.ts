import { BuildErrorInput, BuildOutput } from './interfaces';
import buildResponse from './buildResponse';
import ERRORS from './constants/errors';

/** Failed operation */
const buildErrorResponse = ({
  statusCode,
  error,
  message,
  ...rest
}: BuildErrorInput): BuildOutput => {
  const body = {
    statusCode,
    error: error || ERRORS[statusCode],
    message,
  };
  return buildResponse({ ...rest, statusCode, body });
};

export default buildErrorResponse;
