import { State, Action, GameType } from "../games/game";
import NimBot from "./nimBot";
import { submitAction, FinalMessage } from "../handler";
import { reject } from "bluebird";

export default interface Bot {
	getAction(state: State): Action;
}

export function getBotPromise(bot: Bot) {
  return {
    async resolve(startState: State | FinalMessage) {
      let curState = startState;
      while (true) {
        if ((curState as FinalMessage).win != null) {
          return;
        } else {
          const action = bot.getAction(curState as State)
          curState = await submitAction(action);
        }
      }
    },
    reject() {
    }
  }
}  

export const getBot = (gameType: GameType): any => {
  switch (gameType) {
    case GameType.Nim:
      return getBotPromise(new NimBot());
    default:
      return getBotPromise(new NimBot());
  }
} 