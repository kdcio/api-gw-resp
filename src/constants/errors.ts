import STATUS from './status';

const ERRORS = {
  [STATUS.BAD_REQUEST]: 'Bad Request',
  [STATUS.UNAUTHORIZED]: 'Unauthorized',
  [STATUS.FORBIDDEN]: 'Forbidden',
  [STATUS.NOT_FOUND]: 'Not Found',
  [STATUS.CONFLICT]: 'Conflict',
  [STATUS.SERVER_ERROR]: 'Internal Server Error',
};

export default ERRORS;
