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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = exports.getStart = void 0;
const findEl_1 = __importDefault(require("../utils/findEl"));
const db_1 = require("../db/db");
const getStart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Hi");
});
exports.getStart = getStart;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(db_1.videos);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            errorsMessages: "Не удалось найти нужную информацию"
        });
    }
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, findEl_1.default)(req, res, db_1.videos);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: "Can't find el"
        });
    }
});
exports.getOne = getOne;
const createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newVideo = {
            id: +(new Date()),
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            createdAt: (new Date()).toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
        };
        let videoTmp = {
            id: +(new Date()),
            title: req.body.title,
            author: req.body.author,
            availableResolutions: req.body.availableResolutions,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: (new Date()).toISOString(),
            publicationDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
        };
        newVideo = Object.assign(newVideo, videoTmp);
        db_1.videos.push(newVideo);
        res.status(201).send(newVideo);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: "Something is wrong"
        });
    }
});
exports.createOne = createOne;
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let foundedEl = db_1.videos.find(el => (el === null || el === void 0 ? void 0 : el.id) === +id);
        if (foundedEl) {
            const index = db_1.videos.indexOf(foundedEl);
            foundedEl = Object.assign(foundedEl, req.body);
            db_1.videos[index] = foundedEl;
            res.status(204).send(foundedEl);
            return;
        }
        res.status(404).send("Not ok");
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: "Something is wrong"
        });
    }
});
exports.updateOne = updateOne;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        for (let i = 0; i < db_1.videos.length; i++) {
            if (((_a = db_1.videos[i]) === null || _a === void 0 ? void 0 : _a.id) === +req.params.id) {
                db_1.videos.splice(i, 1);
                res.send(204);
                return;
            }
        }
        res.status(404).send('Not Ok');
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: "Something is wrong"
        });
    }
});
exports.deleteOne = deleteOne;
