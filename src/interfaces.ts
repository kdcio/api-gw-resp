export interface BuildInput {
  statusCode: number;
  body?: object | string;
  cors?: boolean;
  headers?: object;
}

export interface BuildErrorInput {
  statusCode: number;
  error?: string;
  message?: string;
}

export interface OpsInput {
  body?: object | string;
  cors?: boolean;
  headers?: object;
}

export interface OpsErrorInput {
  error?: string;
  message?: string;
}

export interface BuildOutput {
  statusCode: number;
  isBase64Encoded: boolean;
  headers: object;
  body?: object | string | undefined;
}
