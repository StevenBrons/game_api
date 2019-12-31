"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const game_1 = require("./game");
const MIN_START_PILE = 100;
const MAX_START_PILE = 100;
const Nim = {
    getStartState: () => {
        return {
            stateId: v4_1.default(),
            pile: MIN_START_PILE +
                Math.floor(Math.random() * (MAX_START_PILE - MIN_START_PILE)),
            gameType: game_1.GameType.Nim,
            matchId: v4_1.default(),
            prevStateId: null
        };
    },
    isValidState: (state) => {
        return state.pile >= MIN_START_PILE && state.pile <= MAX_START_PILE;
    },
    isValidAction: (fromState, action) => {
        return (action.numberToPick <= fromState.pile &&
            action.numberToPick <= 3 &&
            action.numberToPick > 0);
    },
    applyAction: (fromState, action) => {
        let newState = { ...fromState };
        newState.pile -= action.numberToPick;
        return newState;
    },
    isFinalState: (state) => {
        return state.pile === 0;
    }
};
exports.default = Nim;
