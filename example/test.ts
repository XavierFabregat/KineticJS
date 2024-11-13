import path from 'path';
import Kinetic, { Router, bodyParser, staticFiles } from '../dist';

const app = new Kinetic();
const router = new Router();
router.get('/', (req, res) => {
  res.status(200);
  res.end('Hello from router \n');
});

router.post('/', (req, res) => {
  const { hello } = req.body;
  res.status(200);
  const message =
    hello === 'hi' ? 'Hello to you too! :D' : 'Its nice to say hello :(';
  res.end(`${message} \n`);
});

router.get('/fail', (_, res) => {
  res.status(500);
  res.end('Server Error');
});

app
  .use(bodyParser)
  .use(staticFiles(path.join(__dirname, 'public')))
  .use('/', router)
  .listen(4040, () => console.log('running'));
