"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gameRoute_1 = __importDefault(require("./gameRoute"));
const game_1 = require("../games/game");
const router = express_1.default.Router();
router.use("/nim", gameRoute_1.default(game_1.getGame(game_1.GameType.Nim)));
exports.default = router;
