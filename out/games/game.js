"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nim_1 = __importDefault(require("../games/nim"));
var GameType;
(function (GameType) {
    GameType[GameType["UNDEFINED"] = 0] = "UNDEFINED";
    GameType[GameType["Nim"] = 1] = "Nim";
    GameType[GameType["TickTackToe"] = 2] = "TickTackToe";
})(GameType = exports.GameType || (exports.GameType = {}));
class State {
}
exports.State = State;
class Action {
}
exports.Action = Action;
class Game {
    isFinalState(state) {
        throw new Error("Unimplemented");
    }
    isValidAction(fromState, action) {
        throw new Error("Unimplemented");
    }
    getStartState() {
        throw new Error("Unimplemented");
    }
    applyAction(fromState, action) {
        throw new Error("Unimplemented");
    }
    isValidState(state) {
        throw new Error("Unimplemented");
    }
}
exports.default = Game;
exports.getGame = (gameType) => {
    switch (gameType) {
        case GameType.Nim:
            return nim_1.default;
        default:
            return new Game();
    }
};
