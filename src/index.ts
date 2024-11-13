import Kinetic from './kinetic';
import { Router } from './router';
import { bodyParser } from './bodyparser';
import { staticFiles } from './staticFiles';

// export { Router, bodyParser, staticFiles };
(Kinetic as any).Router = Router;
(Kinetic as any).bodyParser = bodyParser;
(Kinetic as any).staticFiles = staticFiles;

export = Kinetic;
