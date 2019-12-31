"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const database_1 = require("./database");
const game_1 = require("./games/game");
const matchQueue = [];
const actionQueue = [];
async function handleMatches() {
    if (matchQueue.length >= 2) {
        const gameType = game_1.GameType["Nim"];
        const game = game_1.getGame(gameType);
        let startState = {
            ...game.getStartState(),
            matchId: v4_1.default(),
            stateId: v4_1.default(),
            prevStateId: null,
            gameType: gameType
        };
        const player1 = matchQueue.shift();
        const player2 = matchQueue.shift();
        player1.resolve(startState);
        player2.resolve(startState);
    }
}
exports.awaitMatch = () => new Promise((resolve, reject) => {
    let obj = {
        resolve,
        reject
    };
    matchQueue.push(obj);
    handleMatches();
});
exports.awaitAction = (matchId) => new Promise((resolve, reject) => {
    let obj = {
        matchId,
        resolve,
        reject
    };
    actionQueue.push(obj);
});
exports.getStateByMatchId = async (matchId) => {
    const state = await database_1.State.findOne({
        where: {
            matchId
        },
        attributes: [["id", "stateId"], "gameType", "matchId", "prevStateId"],
        order: ["createdAt"]
    });
    if (state) {
        return state;
    }
    else {
        throw new Error("Cannot find state");
    }
};
exports.submitAction = async (action) => {
    const oldState = await exports.getStateByMatchId(action.matchId);
    const gameType = oldState.gameType;
    const game = game_1.getGame(gameType);
    if (!game.isValidAction(oldState, action))
        return;
    let newState = {
        ...game.applyAction(oldState, action),
        prevStateId: oldState.stateId,
        stateId: v4_1.default()
    };
    database_1.State.create(newState);
};
