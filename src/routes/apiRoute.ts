import express from "express";
import gameRoute from "./gameRoute";
import { getGame, GameType } from "../games/game";

const router = express.Router();

router.use("/nim", gameRoute(getGame(GameType.Nim)));

export default router;
