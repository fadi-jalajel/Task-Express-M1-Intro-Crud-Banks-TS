import { Router } from "express";
import { getAllCards } from "../controllers/bank.controller";


const router = Router();

router.get("/", getAllCards );

export default router;