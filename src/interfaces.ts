import STATUS from './constants/status';

export interface BuildInput {
  statusCode: STATUS;
  body?: object | string;
  cors?: boolean;
  headers?: object;
  origin?: string;
}

export interface BuildErrorInput {
  statusCode: STATUS;
  error?: string;
  message?: string;
}

export interface OpsInput {
  body?: object | string;
  cors?: boolean;
  headers?: object;
  origin?: string;
}

export interface OpsRedirectInput {
  cors?: boolean;
  location: string;
  headers?: object;
  permanent: boolean;
}

export interface OpsErrorInput {
  error?: string;
  message?: string;
}

export interface BuildOutput {
  statusCode: STATUS;
  isBase64Encoded: boolean;
  headers: object;
  body?: object | string;
}
