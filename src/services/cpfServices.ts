import { injectable } from 'inversify';
import cpfModel from '../models/Cpf';
import isValid from '../controllers/cpfValidator';
import { Request, Response } from 'express';
import { promisify } from 'util';

let quantidade_de_requests = 0;

@injectable()
export class CpfServices {
	public blockCpf = async (req: Request, res: Response) => {
		const cpfToLock = new cpfModel(req.params);
		quantidade_de_requests++;

		if (isValid(cpfToLock.cpf) === false) {
			res.status(200).send({ message: 'O CPF informado não é valido.' });
			return;
		}
		const verifier = await cpfModel
			.find({ cpf: cpfToLock.cpf })
			.estimatedDocumentCount();

		if (verifier) {
			res.status(200).send({ message: 'O CPF informado JÁ esta bloqueado.' });
			return;
		} else {
			await promisify(cpfToLock.save.bind(cpfToLock))();
			res.status(200).send({ message: 'O CPF foi bloqueado com sucesso.' });
			return;
		}
	};
	public unblockCpf = async (req: Request, res: Response) => {
		const cpfToUnlock = new cpfModel(req.params);
		quantidade_de_requests++;

		if (isValid(cpfToUnlock) === false) {
			res.status(200).send({ message: 'O CPF informado NÃO é valido!' });
			return;
		}
		const verifier = await cpfModel
			.find({ cpf: cpfToUnlock.cpf })
			.estimatedDocumentCount();

		if (!verifier) {
			res.status(200).send({
				message: 'O CPF informado NÃO esta bloqueado!',
			});
		} else {
			await cpfModel.findOneAndDelete({ cpfs: { cpf: cpfToUnlock } }).exec();
			res.status(200).send({
				message: 'O CPF informado FOI removido da lista',
			});
		}
	};
	public cpfIsBlocked = async (req: Request, res: Response) => {
		const cpfToFind = new cpfModel(req.params);
		quantidade_de_requests++;

		if (isValid(cpfToFind) === false) {
			res.status(200).send({ message: 'O CPF informado NÃO é valido.' });
			return;
		}
		const verifier = await cpfModel
			.find({ cpf: cpfToFind.cpf })
			.estimatedDocumentCount();

		if (!verifier) {
			res.status(200).send({ message: 'O CPF NÃO esta bloqueado.' });
			return;
		} else {
			res.status(200).send({ message: 'O CPF esta bloqueado' });
			return;
		}
	};
	public serverStatus = async (res: Response) => {
		quantidade_de_requests++;
		const tempo_online = process.uptime();
		const quantidade_de_docs = await cpfModel.estimatedDocumentCount();
		res.status(200).send({
			quantidade_de_requests,
			tempo_online,
			quantidade_de_docs,
		});
	};
}
