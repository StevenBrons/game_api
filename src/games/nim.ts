import UUID from "uuid/v4";
import Game, { State, Action, GameType } from "./game";

const MAX_PILE = 5

export interface NimState extends State {
  piles: number[];
}

export interface NimAction extends Action {
  numberToPick: number;
  pileIndex: number;
}

const Nim: Game = {
  getStartState: (): NimState => {
    return {
      stateId: UUID(),
      piles: [3,4,5],
      gameType: GameType.Nim,
      matchId: UUID(),
      prevStateId: null
    };
  },
  isValidState: (state: NimState): boolean => {
    return state.piles.filter((pile) => pile >= 0 && pile <= MAX_PILE).length === 0;
  },
  isValidAction: (fromState: NimState, action: NimAction): boolean => {
    if (action.numberToPick <= 0 || action.numberToPick > 2) {
      throw new Error(`numberToPick must be either 1 or 2!`);
    }
    if (action.pileIndex == null || action.pileIndex < 0 || action.pileIndex >= fromState.piles.length) {
      throw new Error(`There is no pile with index \"${action.pileIndex}\"!`);
    }
    if (fromState.piles[action.pileIndex] - action.numberToPick < 0) {
      throw new Error(`You tried to pick ${action.numberToPick} from pile ${action.pileIndex}, but this would result into a negative number!`);
    }
    return true;
  },
  applyAction: (fromState: NimState, action: NimAction): NimState => {
    let newState = { ...fromState };
    newState.piles[action.pileIndex] -= action.numberToPick;
    return newState;
  },
  isFinalState: (state: NimState): boolean => {
    return state.piles.filter(pile => pile === 0).length === state.piles.length;
  },
  getType: (): GameType => {
    return GameType.Nim;
  }
};

export default Nim;
