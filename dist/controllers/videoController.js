"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneVideo = exports.updateOneVideo = exports.createOneVideo = exports.getOneVideo = exports.getAllVideos = exports.getStart = void 0;
const videosRepository_1 = require("../repositories/videosRepository");
const getStart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send("Hi");
});
exports.getStart = getStart;
function getAllVideos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allVideos = yield videosRepository_1.videosRepository.getAll();
            res.status(200).send(allVideos);
        }
        catch (err) {
            console.log(err);
            res.status(404).json({
                errorsMessages: "Не удалось найти нужную информацию"
            });
        }
    });
}
exports.getAllVideos = getAllVideos;
function getOneVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            const foundedVideo = yield videosRepository_1.videosRepository.getOne(id);
            console.log(foundedVideo);
            if (foundedVideo) {
                res.status(200).send(foundedVideo);
            }
            else {
                res.sendStatus(404);
            }
        }
        catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Can't find el"
            });
        }
    });
}
exports.getOneVideo = getOneVideo;
function createOneVideo(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newVideo = yield videosRepository_1.videosRepository.createOne(req.body.title, req.body.author, (_a = req.body) === null || _a === void 0 ? void 0 : _a.availableResolutions, (_b = req.body) === null || _b === void 0 ? void 0 : _b.canBeDownloaded, (_c = req.body) === null || _c === void 0 ? void 0 : _c.minAgeRestriction);
            res.status(201).send(newVideo);
        }
        catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Something is wrong"
            });
        }
    });
}
exports.createOneVideo = createOneVideo;
function updateOneVideo(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            const updatedEl = yield videosRepository_1.videosRepository.updateOne(id, req.body.title, req.body.author, (_a = req.body) === null || _a === void 0 ? void 0 : _a.availableResolutions, (_b = req.body) === null || _b === void 0 ? void 0 : _b.canBeDownloaded, (_c = req.body) === null || _c === void 0 ? void 0 : _c.minAgeRestriction);
            if (!updatedEl)
                return res.send(404);
            const video = yield videosRepository_1.videosRepository.getOne(id);
            res.status(204).send(video);
        }
        catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Something is wrong"
            });
        }
    });
}
exports.updateOneVideo = updateOneVideo;
function deleteOneVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = +req.params.id;
            const result = yield videosRepository_1.videosRepository.deleteOne(id);
            if (!result)
                return res.send(404);
            res.send(204);
        }
        catch (err) {
            console.log(err);
            res.status(404).json({
                message: "Something is wrong"
            });
        }
    });
}
exports.deleteOneVideo = deleteOneVideo;
