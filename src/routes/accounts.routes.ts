import { Router } from "express";
import { getAllAccounts, createAccount, updateAccount, deleteAccount } from "../controllers/accounts.controllers";


const router = Router();


router.get("/", getAllAccounts );
router.post("/", createAccount);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);


export default router;