import { Request, Response } from 'express';
import { Cpf } from '../domain/Cpf';
import { CpfServices } from '../application/cpfServices';
import { RequestCounter } from '../infrastructure/requestCounter';
import { controller, httpGet, httpPost } from 'inversify-express-utils';

@controller('/cpf')
export class CpfController {
	constructor(
		private readonly cpfServices: CpfServices,
		private readonly requestCounter: RequestCounter,
	) {}

	@httpPost('/block/:cpf')
	async blockCpf(req: Request, res: Response) {
		const cpfNumber = req.params.cpf;
		const cpf = new Cpf({ number: cpfNumber });

		try {
			await this.cpfServices.addCpf(cpf);
			res.status(200).send({ message: 'O CPF foi bloqueado com sucesso.' });
		} catch (error) {
			res.status(500).send({ message: 'Ocorreu um erro ao bloquear o CPF.' });
		}
	}

	@httpPost('/unblock/:cpf')
	async unblockCpf(req: Request, res: Response) {
		const cpfNumber = req.params.cpf;

		try {
			await this.cpfServices.deleteCpf(cpfNumber);
			res.status(200).send({ message: 'O CPF foi desbloqueado com sucesso.' });
		} catch (error) {
			res
				.status(500)
				.send({ message: 'Ocorreu um erro ao desbloquear o CPF.' });
		}
	}

	@httpGet('/is-blocked/:cpf')
	async cpfIsBlocked(req: Request, res: Response) {
		const cpfNumber = req.params.cpf;

		try {
			const cpfs = await this.cpfServices.getAllCpfs();
			const isBlocked = cpfs.some((cpf) => cpf.number === cpfNumber);

			if (isBlocked) {
				res.status(200).send({ message: 'O CPF está bloqueado.' });
			} else {
				res.status(200).send({ message: 'O CPF não está bloqueado.' });
			}
		} catch (error) {
			res.status(500).send({ message: 'Ocorreu um erro ao verificar o CPF.' });
		}
	}

	@httpGet('/status')
	async serverStatus(req: Request, res: Response) {
		const uptime = process.uptime();
		const cpfCount = await this.cpfServices.getCpfCount();
		const requestCount = this.requestCounter.getCount();

		res.status(200).send({
			uptime,
			cpfCount,
			requestCount,
		});
	}
}
