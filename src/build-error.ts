import buildResponse from './build';
import ERRORS from './constants/errors';

interface BuildErrorInput {
  statusCode: number;
  error?: string;
  message?: string;
  opts?: any;
}

/** Failed operation */
const buildErrorResponse = ({
  statusCode,
  error,
  message,
  ...opts
}: BuildErrorInput) => {
  const body = {
    statusCode,
    error: error || ERRORS[statusCode],
    message,
  };
  return buildResponse({ ...opts, statusCode, body });
};

export default buildErrorResponse;
