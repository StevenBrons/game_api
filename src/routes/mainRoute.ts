import express from "express";
import nim from "../games/nim";
import gameRoute from "./gameRoute";

const router = express.Router();

router.use('/tick_tack_toe', gameRoute(nim));

export default router;