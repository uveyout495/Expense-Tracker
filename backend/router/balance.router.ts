import express from "express";
import { addBalance, editBalance, getRecentBalance, getTotalBalance } from "../controller/balance.controller";

const router = express.Router();

router.post("/add" , addBalance)
router.put("/editbalance" , editBalance)
router.get("/" , getTotalBalance)
router.get("/recent" , getRecentBalance)

export default router;