"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dist_1 = __importStar(require("../dist"));
const app = new dist_1.default();
const router = new dist_1.Router();
router.get('/', (req, res) => {
    res.status(200);
    res.end('Hello from router \n');
});
router.post('/', (req, res) => {
    const { hello } = req.body;
    res.status(200);
    const message = hello === 'hi' ? 'Hello to you too! :D' : 'Its nice to say hello :(';
    res.end(`${message} \n`);
});
router.get('/fail', (_, res) => {
    res.status(500);
    res.end('Server Error');
});
app
    .use(dist_1.bodyParser)
    .use((0, dist_1.staticFiles)(path_1.default.join(__dirname, 'public')))
    .use('/', router)
    .listen(4040, () => console.log('running'));
//# sourceMappingURL=test.js.map