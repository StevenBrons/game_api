"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1.default.config();
const sequelize = new sequelize_1.default.Sequelize(process.env.DATABASE_SCHEMA, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql"
});
class State extends sequelize_1.default.Model {
}
exports.State = State;
State.init({
    stateId: { type: sequelize_1.default.STRING, primaryKey: true },
    gameId: sequelize_1.default.STRING,
    matchId: sequelize_1.default.STRING,
    prevStateId: sequelize_1.default.STRING
}, {
    sequelize,
    modelName: "task"
});
sequelize.sync();
