import express from "express";
import gameRoute from "./gameRoute";
import { getGame, GameType } from "../games/game";

const router = express.Router();

router.use("/", (req: Express.Request, res: any) => {
	res.render("index");
});

export default router;
