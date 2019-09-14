import express from "express";
import game from "../games/game";

export default (game: game): express.Router => {
	const router = express.Router();

	router.post('/match', (req: express.Request, res: express.Response) => {
	});

	router.post('/state', (req: express.Request, res: express.Response) => {
	});

	router.post('/move', (req: express.Request, res: express.Response) => {
	});
	return router;
};