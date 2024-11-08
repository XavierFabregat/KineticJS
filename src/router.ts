import http from 'http';
import {
  Route,
  Method,
  KineticRequest,
  RouteHandler,
  KineticResponse,
} from './types';

export class Router {
  private routes: {
    [key: string]: Route[];
  };

  constructor() {
    this.routes = {};
  }

  use(
    path: string,
    handler: (req: KineticRequest, res: KineticResponse) => void
  ) {
    this.addRoute('GET', path, handler);
  }

  private addRoute(method: Method, path: string, handler: RouteHandler) {
    if (!this.routes[path]) {
      this.routes[path] = [];
    }
    this.routes[path].push({ method, handler });
  }

  get(
    path: string,
    handler: (req: KineticRequest, res: KineticResponse) => void
  ) {
    this.addRoute('GET', path, handler);
  }

  post(
    path: string,
    handler: (req: KineticRequest, res: KineticResponse) => void
  ) {
    this.addRoute('POST', path, handler);
  }

  getRoutes(): { [key: string]: Route[] } {
    return this.routes;
  }

  static isRouter(handler: any): handler is Router {
    return (
      typeof handler === 'object' &&
      handler !== null &&
      'getRoutes' in handler &&
      typeof handler.getRoutes === 'function'
    );
  }
}
