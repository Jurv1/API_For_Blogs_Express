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
const videoValidation_1 = require("./validations/videoValidation");
const VideoController = __importStar(require("./controllers/videoController"));
const handleErr_1 = __importDefault(require("./utils/handleErr"));
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
app.get('/videos', VideoController.getAll);
app.get('/videos/:id', VideoController.getOne);
app.post('/videos', VideoController.createOne);
app.put('/videos/:id', videoValidation_1.videoValidation, handleErr_1.default, VideoController.updateOne);
app.delete('/videos/:id', VideoController.deleteOne);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
