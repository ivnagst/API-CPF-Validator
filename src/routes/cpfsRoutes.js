import express from "express";
import CpfController from "../controllers/cpfsController.js"
const router = express.Router();


router
    .post("/deny-list/:cpf", CpfController.blockCPF)
    .delete("/deny-list/:cpf", CpfController.unlockCPF)
    .get("/deny-list/:cpf", CpfController.cpfIsBlocked)
    .get("/status", CpfController.serverStatus)

export default router;

