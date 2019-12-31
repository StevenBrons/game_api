import nim from "../games/nim";

export type stateId = string | number;
export type matchId = string | number;
export type actionId = string | number;

export enum GameType {
  Nim = "nim",
  TickTackToe = "tick_tack_toe"
}

export class State {
  stateId!: stateId;
  gameType!: GameType;
  matchId!: matchId;
  prevStateId!: stateId | null;
}

export class Action {
  actionId!: actionId;
  fromStateId!: stateId;
  matchId!: matchId;
}

export default class Game {
  isFinalState(state: State): boolean {
    throw new Error("Unimplemented");
  }

  isValidAction(fromState: State, action: Action): boolean {
    throw new Error("Unimplemented");
  }

  getStartState(): State {
    throw new Error("Unimplemented");
  }
  applyAction(fromState: State, action: Action): State {
    throw new Error("Unimplemented");
  }
  isValidState(state: State) {
    throw new Error("Unimplemented");
  }
  getType(): GameType {
    throw new Error("Unimplemented");
  }
}

export const getGame = (gameType: GameType): Game => {
  switch (gameType) {
    case GameType.Nim:
      return nim;
    default:
      return new Game();
  }
};
