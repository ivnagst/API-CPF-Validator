import { Router } from 'express';
import CpfController from '../controllers/cpfsController';
const router: Router = Router();

router
	.post('/deny-list/cpf', CpfController.blockCpf)
	.delete('/deny-list/cpf', CpfController.unblockCpf)
	.get('/deny-list/cpf', CpfController.cpfIsBlocked)
	.get('/status', CpfController.serverStatus);

export default router;
