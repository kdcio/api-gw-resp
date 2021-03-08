import STATUS from './status';

export const ERRORS = {
  [STATUS.BAD_REQUEST]: 'Bad Request',
  [STATUS.UNAUTHORIZED]: 'Unauthorized',
  [STATUS.FORBIDDEN]: 'Forbidden',
  [STATUS.NOT_FOUND]: 'Not Found',
  [STATUS.CONFLICT]: 'Conflict',
  [STATUS.SERVER_ERROR]: 'Internal Server Error',
};

export const ERR_MSGS = [
  { status: STATUS.BAD_REQUEST, regex: /missing|invalid/i },
  { status: STATUS.UNAUTHORIZED, regex: /unauthorized/i },
  { status: STATUS.FORBIDDEN, regex: /forbidden|not allowed/i },
  { status: STATUS.NOT_FOUND, regex: /not found/i },
  { status: STATUS.CONFLICT, regex: /conflict|duplicate/i },
];
