import http from 'http';

export class KineticRequest extends http.IncomingMessage {
  body?: any;
}

export class KineticResponse extends http.ServerResponse {
  status(code: number): this {
    this.writeHead(code);
    return this;
  }
}

export type RouteHandler = (req: KineticRequest, res: KineticResponse) => void;

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Route {
  method: Method;
  handler: RouteHandler;
}

export type Middleware = (
  req: KineticRequest,
  res: KineticResponse,
  next: () => void
) => void;
