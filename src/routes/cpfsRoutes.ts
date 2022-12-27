import CpfController from '../controllers/cpfsController';
import express from 'express';
const router = express.Router();

router
	.post('/deny-list/:cpf', CpfController.blockCpf)
	.delete('/deny-list/:cpf', CpfController.unblockCpf)
	.get('/deny-list/:cpf', CpfController.cpfIsBlocked)
	.get('/status', CpfController.serverStatus);

export default router;
