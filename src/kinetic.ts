import http from 'http';
import {
  Route,
  Middleware,
  RouteHandler,
  Method,
  KineticRequest,
  KineticResponse,
} from './types';
import { Router } from './router';
import { staticFiles } from './staticFiles';

export default class Kinetic {
  private routes: {
    [key: string]: Route[];
  };

  private middleware: Middleware[];

  constructor() {
    this.routes = {};
    this.middleware = [];
  }

  use(middleware: Middleware): this;
  use(path: string, handler: Router): this;
  use(path: string, handler: RouteHandler): this;
  use(
    pathOrMiddleware: string | Middleware,
    handler?: RouteHandler | Router
  ): this {
    if (typeof pathOrMiddleware === 'function' && handler === undefined) {
      // Case: use(middleware)
      this.middleware.push(pathOrMiddleware);
    } else if (typeof pathOrMiddleware === 'string' && handler) {
      const path = pathOrMiddleware;

      if (Router.isRouter(handler)) {
        // Handler is a Router
        const routes = handler.getRoutes();
        for (const [routePath, routeHandlers] of Object.entries(routes)) {
          this.routes[routePath] = routeHandlers;
        }
      } else if (typeof handler === 'function') {
        // Handler is a RouteHandler
        this.addRoute('GET', path, handler as RouteHandler);
      } else {
        throw new Error('Handler must be a function or Router object.');
      }
    }

    return this;
  }

  listen(port: number, callback: () => void) {
    const server = http.createServer((req, res) => {
      // Set prototypes to KineticRequest and KineticResponse
      Object.setPrototypeOf(req, KineticRequest.prototype);
      Object.setPrototypeOf(res, KineticResponse.prototype);

      const { url, method } = req;

      const routeHandler = this.routes[url as string]?.find(
        (handler) => handler.method === method
      )?.handler;

      const isFileRequest = url?.includes('.') || url === '/';

      if (routeHandler) {
        const middlewares = this.middleware;

        let index = -1;

        const next = () => {
          index++;
          if (index < middlewares.length) {
            middlewares[index]!(req, res as KineticResponse, next);
          } else {
            routeHandler(req, res as KineticResponse);
          }
        };

        next(); // start middleware chain
      } else if (isFileRequest) {
        const middlewares = this.middleware;

        let index = -1;

        const next = () => {
          index++;
          if (index < middlewares.length) {
            middlewares[index]!(req, res as KineticResponse, next);
          } else {
            staticFiles(req.url!)(req, res as KineticResponse, () => {});
          }
        };

        next();
      } else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('Not found');
      }
    });

    server.listen(port, callback);
  }

  private addRoute(method: Method, path: string, handler: RouteHandler) {
    if (!this.routes[path]) {
      this.routes[path] = [];
    }
    this.routes[path].push({ method, handler });
  }
}
