import UUID from "uuid/v4";
import Game, { State, Action, GameType } from "./game";

const MIN_START_PILE = 100;
const MAX_START_PILE = 100;

export interface NimState extends State {
  pile: number;
}

export interface NimAction extends Action {
  numberToPick: number;
}

const Nim: Game = {
  getStartState: (): NimState => {
    return {
      stateId: UUID(),
      pile:
        MIN_START_PILE +
        Math.floor(Math.random() * (MAX_START_PILE - MIN_START_PILE)),
      gameType: GameType.Nim,
      matchId: UUID(),
      prevStateId: null
    };
  },
  isValidState: (state: NimState): boolean => {
    return state.pile >= MIN_START_PILE && state.pile <= MAX_START_PILE;
  },
  isValidAction: (fromState: NimState, action: NimAction): boolean => {
    return (
      action.numberToPick <= fromState.pile &&
      action.numberToPick <= 3 &&
      action.numberToPick > 0
    );
  },
  applyAction: (fromState: NimState, action: NimAction): NimState => {
    let newState = { ...fromState };
    newState.pile -= action.numberToPick;
    return newState;
  },
  isFinalState: (state: NimState): boolean => {
    return state.pile === 0;
  }
};

export default Nim;
