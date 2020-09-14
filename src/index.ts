import * as SUCCESS from './success';
import * as ERRORS from './errors';

const response = Object.freeze({ ...SUCCESS, ...ERRORS });

export default response;
