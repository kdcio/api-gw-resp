import RESP_TEMPLATE from './constants/template';

const buildBody = (body) => {
  if (body && typeof body === 'object') {
    return { body: JSON.stringify(body), contentType: 'application/json' };
  }

  if (body && typeof body === 'string') {
    return { body, contentType: 'text/plain' };
  }

  return { body: undefined, contentType: undefined };
};

interface BuildInput {
  statusCode: number;
  body?: any;
  cors?: boolean;
  headers?: object;
  opts?: any;
}

const buildResponse = ({
  statusCode,
  body,
  cors = true,
  headers = {},
  ...opts
}: BuildInput) => {
  const response = {
    ...RESP_TEMPLATE,
    headers:
      cors === false
        ? { ...headers }
        : { ...RESP_TEMPLATE.headers, ...headers },
    ...opts,
    statusCode,
  };

  const { body: bBody, contentType } = buildBody(body);
  if (bBody) {
    response.body = bBody;
    response.headers['Content-Type'] = contentType;
  }

  return response;
};

export default buildResponse;
