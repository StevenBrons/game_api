import Sequelize from "sequelize";
import dotenv from "dotenv-safe";
import {
  matchId,
  State as StateType,
} from "./games/game";

dotenv.config();

const sequelize = new Sequelize.Sequelize(
  process.env.DATABASE_SCHEMA!,
  process.env.DATABASE_USER!,
  process.env.DATABASE_PASSWORD!,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql"
  }
);

export class State extends Sequelize.Model {}
State.init(
  {
    stateId: { type: Sequelize.STRING, primaryKey: true },
    gameType: Sequelize.STRING,
    matchId: Sequelize.STRING,
    prevStateId: Sequelize.STRING,
    data: Sequelize.JSON,
    isFinal: Sequelize.BOOLEAN,
  },
  {
    sequelize,
    modelName: "state"
  }
);

sequelize.sync();

export const createState = async (
  state: StateType,
): Promise<State> => {
  return State.create({...state,data: state});
}

export const getStateByMatchId = async (
  matchId: matchId
): Promise<StateType> => {
  const state = await State.findOne({
    where: {
      matchId
    },
    attributes: ["data"],
    order: [["createdAt", "DESC"]]
  });
  if (state) {
    return (state as any).data;
  } else {
    throw new Error(`Cannot find a state with matchId: ${matchId}`);
  }
};
