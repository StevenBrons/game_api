import UUID from "uuid/v4";

import { State } from "./database";
import {
  matchId,
  State as StateType,
  GameType,
  getGame,
  Action
} from "./games/game";

import nim from "./games/nim";
import { start } from "repl";

interface MatchQueueObject {
  resolve: Function;
  reject: Function;
}
interface ActionQueueObject {
  matchId: matchId;
  resolve: Function;
  reject: Function;
}

const matchQueue: MatchQueueObject[] = [];
const actionQueue: ActionQueueObject[] = [];

async function handleMatches() {
  if (matchQueue.length >= 2) {
    const gameType: GameType = GameType["Nim"];
    const game = getGame(gameType);
    let startState: StateType = {
      ...game.getStartState(),
      matchId: UUID(),
      stateId: UUID(),
      prevStateId: null,
      gameType: gameType
    };

    const player1 = matchQueue.shift()!;
    const player2 = matchQueue.shift()!;
    player1.resolve(startState);
    player2.resolve(startState);
  }
}

export const awaitMatch = () =>
  new Promise((resolve, reject) => {
    let obj: MatchQueueObject = {
      resolve,
      reject
    };
    matchQueue.push(obj);
    handleMatches();
  });

export const awaitAction = (matchId: matchId) =>
  new Promise((resolve, reject) => {
    let obj: ActionQueueObject = {
      matchId,
      resolve,
      reject
    };
    actionQueue.push(obj);
  });

export const getStateByMatchId = async (
  matchId: matchId
): Promise<StateType> => {
  const state = await State.findOne({
    where: {
      matchId
    },
    order: ["createdAt"]
  });
  if (state) {
    return state;
  } else {
    throw new Error("Cannot find state");
  }
};

export const submitAction = async (action: Action): Promise<any> => {
  const oldState = await getStateByMatchId(action.matchId);
  const gameType = oldState.gameType;
  const game = getGame(gameType);
  if (!game.isValidAction(oldState, action)) return;
  let newState = {
    ...game.applyAction(oldState, action),
    prevStateId: oldState.stateId,
    stateId: UUID()
  };
  State.create(newState);
};
