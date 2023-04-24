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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const testingController = __importStar(require("./services/testingService"));
const postRouter_1 = require("./routs/postRouter");
const blogRouter_1 = require("./routs/blogRouter");
const videoRouter_1 = require("./routs/videoRouter");
const db_1 = require("./db/db");
const userRouter_1 = require("./routs/userRouter");
const authRouter_1 = require("./routs/authRouter");
const commentRouter_1 = require("./routs/commentRouter");
const securityRouter_1 = require("./routs/securityRouter");
exports.app = (0, express_1.default)();
const port = 3003;
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
const allowedOrigins = ['http://localhost:3003'];
const options = {
    origin: allowedOrigins
};
// Then pass these options to cors:
exports.app.use((0, cors_1.default)(options));
exports.app.use((0, cookie_parser_1.default)());
exports.app.set('trust proxy', true);
exports.app.get('/', videoRouter_1.videoService.getStart);
exports.app.use('/videos', videoRouter_1.videoRouter);
exports.app.use('/blogs', blogRouter_1.blogRouter);
exports.app.use('/posts', postRouter_1.postRouter);
exports.app.use('/users', userRouter_1.userRouter);
exports.app.use('/auth', authRouter_1.authRouter);
exports.app.use('/comments', commentRouter_1.commentRouter);
exports.app.use('/security', securityRouter_1.securityRouter);
exports.app.delete('/testing/all-data', testingController.deleteAll);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    exports.app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
