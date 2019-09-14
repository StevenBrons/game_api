import UUID from "uuid/v4"
import Game, { GeneralState, GeneralTransition, GameType } from "./game"

export interface State extends GeneralState {
	pile: number;
}

export interface Transition extends GeneralTransition {
	numberToPick: number;
}

const Nim: Game = {
	getStartState: (): State => {
		return {
			stateId: UUID(),
			pile: Math.floor(Math.random() * 100),
			gameId: GameType.Nim,
			matchId: UUID(),
			prevStateId: null,
		}
	},
	isValidTransition: (fromState: State, transition: Transition): boolean => {
		return transition.numberToPick <= fromState.pile && transition.numberToPick > 0;
	},
	applyStateTransition: (fromState: State, transition: State): State => {
		let newState = Object.assign(Object.create(Object.getPrototypeOf(fromState)), fromState);
		newState.pile -= transition.numberToPick;
		return newState;
	},
	isFinalState: (state: State): boolean => {
		return state.pile === 0;
	},
};

export default Nim;