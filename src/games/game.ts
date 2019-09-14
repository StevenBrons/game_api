export type stateId = string | number;
export type transitionId = string | number;

export enum GameType {
	Nim,
	TickTackToe,
}

export interface GeneralState {
	stateId: stateId;
	gameId: GameType;
	matchId: string;
	prevStateId: stateId | null;
}

export interface GeneralTransition {
	transitionId: transitionId;
	fromStateId: stateId;
	toStateId?: stateId;
}

export default interface Game {
	isFinalState: (state: GeneralState) => boolean;
	isValidTransition: (fromState: GeneralState | NimState, transition: GeneralTransition) => boolean;
	getStartState: () => GeneralState;
	applyStateTransition: (fromState: GeneralState, transition: GeneralTransition) => GeneralState;
} 