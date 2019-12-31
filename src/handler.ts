import UUID from "uuid/v4";

import { State, createState } from "./database";
import Game, {
  matchId,
  State as StateType,
  GameType,
  getGame,
  Action
} from "./games/game";
import {getStateByMatchId} from "./database";
import { getBot } from "./bots/bot";

interface MatchQueueObject {
  resolve: Function;
  reject: Function;
}
interface ActionQueueObject {
  matchId: matchId;
  resolve: Function;
  reject: Function;
}

export interface StartOptions {
  opponent: string;
}

export interface FinalMessage {
  win: boolean;
}

const matchQueue: MatchQueueObject[] = [];
const actionQueue: ActionQueueObject[] = [];

async function handleMatches() {
  if (matchQueue.length >= 2) {
    const gameType: GameType = GameType["Nim"];
    const game = getGame(gameType);
    let startState = {
      ...game.getStartState(),
      matchId: UUID(),
      stateId: UUID(),
      prevStateId: null,
      isFinal: false,
      gameType: gameType
    };
    await createState(startState);

    const player1 = matchQueue.shift()!;
    const player2 = matchQueue.shift()!;
    if (Math.floor(Math.random() * 2) === 0) {
      actionQueue.push({
        ...player1,
        matchId: startState.matchId
      });
      player2.resolve(startState);
    } else {
      player1.resolve(startState);
      actionQueue.push({
        ...player2,
        matchId: startState.matchId
      });
    }
  }
}

export const awaitMatch = (game: Game, startOptions: StartOptions) =>
  new Promise((resolve, reject) => {
    let obj: MatchQueueObject = {
      resolve,
      reject
    };
    matchQueue.push(obj);
    if (startOptions.opponent === "@random") {
      matchQueue.push(getBot(game.getType()));
    }
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

export const submitAction = async (action: Action): Promise<any> => {
  const oldState = await getStateByMatchId(action.matchId);
  const gameType = oldState.gameType;
  const game = getGame(gameType);
  if (!game.isValidAction(oldState, action)) return;
  let newState = {
    ...game.applyAction(oldState, action),
    prevStateId: oldState.stateId, 
    stateId: UUID(),
    isFinal: false
  };
  newState.isFinal = game.isFinalState(newState);
  await createState(newState);
  handleActionQueue(newState,newState.isFinal);
  if (newState.isFinal) {
    return getFinalMessage(true);
  } else {
    return awaitAction(action.matchId);
  }
};

export const handleActionQueue = (newState: StateType, isFinal: boolean): void => {
  const i = actionQueue.findIndex(x => x.matchId == newState.matchId);
  if (i !== -1) {
    const o = actionQueue[i];
    actionQueue.splice(i,1);
    if (isFinal) {
      o.resolve(getFinalMessage(false));
    } else {
      o.resolve(newState);
    }
  }
}

export const getFinalMessage = (win: boolean): FinalMessage => {
  return {
    win,
  }
}