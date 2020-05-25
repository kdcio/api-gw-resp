const RESP_TEMPLATE = {
  statusCode: 200,
  isBase64Encoded: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
  },
  body: null,
};

export default RESP_TEMPLATE;
