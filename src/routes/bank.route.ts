import { Router } from "express";
import { getAllAccounts, createNewAccount, deleteAccount, updateAccount, getAccountByUsername } from "../controllers/bank.controller";

const router = Router();

router.get("/", getAllAccounts);
router.post("/", createNewAccount);
router.delete("/:accountId", deleteAccount);
router.put("/accountId", updateAccount);
router.get("/:username", getAccountByUsername)


export default router;