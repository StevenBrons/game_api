import express from "express";
import game from "../games/game";
import { awaitMatch, awaitAction, submitAction } from "../handler";
import { start } from "repl";
import { HSTORE } from "sequelize/types";

function promiseMiddleware(
  asyncFunction: (req: express.Request, res: express.Response) => Promise<any>
): any {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    asyncFunction(req, res)
      .then(next)
      .catch((error: Error) => {
        res.status(400);
        res.send({
          error: true,
          message: error.message,
        });
      });
  };
}

export default (game: game): express.Router => {
  const router = express.Router();

  router.post(
    "/start",
    promiseMiddleware(async (req: express.Request, res: express.Response) => {
      const startState = await awaitMatch(game,req.body);
      res.send(startState);
    })
  );

  router.post(
    "/action",
    promiseMiddleware(async (req: express.Request, res: express.Response) => {
      const newState = await submitAction(req.body);
      res.send(newState);
    })
  );

  return router;
};
