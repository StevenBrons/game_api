import express from "express";
import game from "../games/game";
import { awaitMatch, awaitAction, submitAction } from "../handler";

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
      .catch(error => {
        res.status(400);
        res.send({
          error: true,
          message: error
        });
      });
  };
}

export default (game: game): express.Router => {
  const router = express.Router();

  router.post(
    "/start",
    promiseMiddleware(async (req: express.Request, res: express.Response) => {
      return awaitMatch();
    })
  );

  router.post(
    "/state",
    promiseMiddleware(async (req: express.Request, res: express.Response) => {
      const body = req.body;
      return awaitAction(body.matchId);
    })
  );

  router.post(
    "/action",
    promiseMiddleware(async (req: express.Request, res: express.Response) => {
      const body = req.body;
      return submitAction(body);
    })
  );

  return router;
};
