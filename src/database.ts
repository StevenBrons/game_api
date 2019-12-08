import Sequelize from "sequelize";
import dotenv from "dotenv-safe";
dotenv.config();

const sequelize = new Sequelize.Sequelize(
  (process.env.DATABASE_SCHEMA = ""),
  (process.env.DATABASE_USER = ""),
  (process.env.DATABASE_PASSWORD = ""),
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql"
  }
);

export class State extends Sequelize.Model {}
State.init(
  {
    stateId: { type: Sequelize.STRING, primaryKey: true },
    gameId: Sequelize.STRING,
    matchId: Sequelize.STRING,
    prevStateId: Sequelize.STRING
  },
  {
    sequelize,
    modelName: "task"
  }
);

sequelize.sync();
