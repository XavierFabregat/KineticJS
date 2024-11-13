import http from 'http';

export class KineticRequest extends http.IncomingMessage {
  body?: any;
}

export class KineticResponse extends http.ServerResponse {
  status(code: number): this {
    this.writeHead(code);
    return this;
  }

  json(data: any): this {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data));
    return this;
  }

  send(data: string | Buffer): this {
    this.end(data);
    return this;
  }

  redirect(url: string): this {
    this.writeHead(302, { Location: url });
    this.end();
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

export type ErrorHandler = (
  err: Error,
  req: KineticRequest,
  res: KineticResponse,
  next: () => void
) => void;
