import 'reflect-metadata';
import {
	controller,
	httpGet,
	httpPost,
	httpDelete,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import TYPES from '../ioc/ioc-types';
import CpfServices from '../services/cpf-services';

@controller('/deny-list')
export class CpfController {
	constructor(@inject(TYPES.CpfServices) public cpfServices: CpfServices) {}

	@httpPost('/:cpf')
	private blockCpf(req: Request, res: Response) {
		return this.cpfServices.blockCpf(req, res);
	}

	@httpDelete('/:cpf')
	private unblockCpf(req: Request, res: Response) {
		return this.cpfServices.unblockCpf(req, res);
	}

	@httpGet('/:cpf')
	private cpfIsBlocked(req: Request, res: Response) {
		return this.cpfServices.cpfIsBlocked(req, res);
	}

	@httpGet('/status')
	private serverStatus(res: Response) {
		return this.cpfServices.serverStatus(res);
	}
}
