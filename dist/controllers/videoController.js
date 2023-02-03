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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
function isIsoDate(str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str))
        return false;
}
let videos = [];
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(videos);
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
        const id = req.params.id;
        const foundedEl = videos.find(el => (el === null || el === void 0 ? void 0 : el.id) === +id);
        if (foundedEl) {
            res.status(200).send(foundedEl);
            return;
        }
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
        if (!(typeof req.body.title === 'string') || req.body.title.length > 40) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "title",
                        "field": "title"
                    }
                ]
            });
        }
        if (!(typeof req.body.author === 'string') || req.body.author > 20) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "author",
                        "field": "author"
                    }
                ]
            });
        }
        if (req.body.availableResolutions != null && (!(req.body.availableResolutions.length > 0) || req.body.availableResolutions > 40)) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "availableResolutions",
                        "field": "availableResolutions"
                    }
                ]
            });
        }
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
        videos.push(newVideo);
        res.status(201).send(newVideo);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: "Can't create el"
        });
    }
});
exports.createOne = createOne;
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.title === null || !(typeof req.body.title === 'string') || req.body.title.length > 40) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "title",
                        "field": "title"
                    }
                ]
            });
        }
        if (req.body.author === null || !(typeof req.body.author === 'string') || req.body.author > 20) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "author",
                        "field": "author"
                    }
                ]
            });
        }
        if (req.body.availableResolutions != null && (!(req.body.availableResolutions.length > 0) || req.body.availableResolutions > 40)) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "availableResolutions",
                        "field": "availableResolutions"
                    }
                ]
            });
        }
        if (req.body.canBeDownloaded != null && (!(typeof req.body.canBeDownloaded === 'boolean'))) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "availableResolutions",
                        "field": "availableResolutions"
                    }
                ]
            });
        }
        if (req.body.minAgeRestriction != null && (!(typeof req.body.minAgeRestriction === 'number') || req.body.minAgeRestriction > 18 || req.body.minAgeRestriction < 1)) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "minAgeRestriction",
                        "field": "minAgeRestriction"
                    }
                ]
            });
        }
        if (!(req.body.publicationDate !== null) && isIsoDate(req.body.publicationDate)) {
            return res.status(400).json({
                "errorsMessages": [
                    {
                        "message": "minAgeRestriction",
                        "field": "minAgeRestriction"
                    }
                ]
            });
        }
        const id = req.params.id;
        let foundedEl = videos.find(el => (el === null || el === void 0 ? void 0 : el.id) === +id);
        if (foundedEl) {
            const index = videos.indexOf(foundedEl);
            foundedEl = Object.assign(foundedEl, req.body);
            videos[index] = foundedEl;
            res.status(204).send(foundedEl);
            return;
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: "Can't update el"
        });
    }
});
exports.updateOne = updateOne;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        for (let i = 0; i < videos.length; i++) {
            if (((_a = videos[i]) === null || _a === void 0 ? void 0 : _a.id) === +req.params.id) {
                videos.splice(i, 1);
                res.send(204);
                return;
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            message: "Can't update el"
        });
    }
});
exports.deleteOne = deleteOne;
