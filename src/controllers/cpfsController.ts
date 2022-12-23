import cpfModel from './../models/Cpf';
import isValid from './cpfValidator';
import { Request, Response } from 'express';

let quantidade_de_requests: number = 0;

class CpfController {
	static blockCpf = async (req: Request, res: Response) => {
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
			res.send({ message: 'O CPF informado JÁ esta bloqueado.' });
			return;
		} else {
			cpfToLock.save(() => {
				res.send({ message: 'O CPF foi bloqueado com sucesso.' });
				return;
			});
		}
	};
	static unblockCpf = async (req: Request, res: Response) => {
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
			cpfModel.findOneAndDelete({ cpfs: { cpf: cpfToUnlock } }, () => {
				res.send({
					message: 'O CPF informado FOI removido da lista',
				});
				return;
			});
		}
	};
	static cpfIsBlocked = async (req: Request, res: Response) => {
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

	static serverStatus = async (req: Request, res: Response) => {
		quantidade_de_requests++;
		const tempo_online: number = process.uptime();
		const quantidade_de_docs = await cpfModel.estimatedDocumentCount();
		res.status(200).send({
			quantidade_de_requests,
			tempo_online,
			quantidade_de_docs,
		});
	};
}

export default CpfController;
