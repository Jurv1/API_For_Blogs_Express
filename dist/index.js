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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const VideoController = __importStar(require("./controllers/videoController"));
const testingController = __importStar(require("./controllers/testingController"));
const postRouter_1 = require("./routs/postRouter");
const blogRouter_1 = require("./routs/blogRouter");
const videoRouter_1 = require("./routs/videoRouter");
const app = (0, express_1.default)();
const port = 3003;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
const allowedOrigins = ['http://localhost:3003'];
const options = {
    origin: allowedOrigins
};
// Then pass these options to cors:
app.use((0, cors_1.default)(options));
app.get('/', VideoController.getStart);
app.use('/videos', videoRouter_1.videoRouter);
app.use('/blogs', blogRouter_1.blogRouter);
app.use('/posts', postRouter_1.postRouter);
app.delete('/testing/all-data', testingController.deleteAll);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
