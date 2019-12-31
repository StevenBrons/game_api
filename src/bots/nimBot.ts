import Bot from "./bot";
import { NimState, NimAction } from "../games/nim";
import UUID from "uuid/v4";

class NimBot implements Bot {
	getAction(state: NimState): NimAction {
		let metaAction = {
			actionId: UUID(),
			matchId: state.matchId,
			fromStateId: state.stateId,
		}
		for (let i = Math.floor(Math.random() * state.piles.length); i < state.piles.length; i++) {
			if (state.piles[i] === 0) continue;
			if (state.piles[i] > 1) {
				return {
					...metaAction,
					pileIndex: i,
					numberToPick: Math.floor(Math.random() * 2) + 1,
				}
			} else {
				return {
					...metaAction,
					pileIndex: i,
					numberToPick: 1,
				}
			}
		}
		throw new Error("Invalid state given to bot!: " + state);
	}
}

export default NimBot;