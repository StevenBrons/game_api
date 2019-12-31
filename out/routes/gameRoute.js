"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = require("../handler");
function promiseMiddleware(asyncFunction) {
    return (req, res, next) => {
        asyncFunction(req, res)
            .then(next)
            .catch(error => {
            res.status(400);
            res.send({
                error: true,
                message: error
            });
        });
    };
}
exports.default = (game) => {
    const router = express_1.default.Router();
    router.get("/test", promiseMiddleware(async (req, res) => {
        res.send("Test");
    }));
    router.post("/start", promiseMiddleware(async (req, res) => {
        const startState = await handler_1.awaitMatch();
        console.log(startState);
        res.send(startState);
    }));
    router.post("/state", promiseMiddleware(async (req, res) => {
        const body = req.body;
        return handler_1.awaitAction(body.matchId);
    }));
    router.post("/action", promiseMiddleware(async (req, res) => {
        const body = req.body;
        return handler_1.submitAction(body);
    }));
    return router;
};
