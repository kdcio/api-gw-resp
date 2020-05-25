import STATUS from './status';

const RESP_TEMPLATE = {
  statusCode: STATUS.OK,
  isBase64Encoded: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
  },
  body: null,
};

export default RESP_TEMPLATE;
