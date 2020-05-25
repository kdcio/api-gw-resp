import buildResponse from './build';
import ERRORS from './constants/errors';

/** Failed operation */
const buildErrorResponse = ({ statusCode, error, message, ...opts }) => {
  const body = {
    statusCode,
    error: error || ERRORS[statusCode],
    message,
  };
  return buildResponse({ ...opts, statusCode, body });
};

export default buildErrorResponse;
