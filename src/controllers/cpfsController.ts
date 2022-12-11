import { cpfModel } from './../models/Cpf';
import isValid from './cpfValidator.js';
import { Request, Response } from 'express';
import { Error } from 'mongoose';

let quantidade_de_requests: number = 0;

class CpfController {
	static blockCpf = async (req: Request, res: Response) => {
		const cpfToLock = new cpfModel(req.body(cpfModel.schema.obj.cpf));
		quantidade_de_requests++;

		if (isValid(cpfToLock) === true) {
			const verifier: number = await cpfModel
				.find({ cpf: cpfToLock.cpf })
				.estimatedDocumentCount();

			if (verifier < 1) {
				() => {
					try {
						cpfToLock.save();
						res
							.status(201)
							.send({ message: 'O CPF foi bloqueado com sucesso!' });
						return;
					} catch (error) {
						res.status(500).send({ message: error });
						return;
					}
				};
			} else {
				res.send({ message: 'O CPF já encontra-se bloquado.' });
			}
		} else {
			res.send({ message: 'O CPF informado não é valido.' });
		}
	};

	static unblockCpf = async (req: Request, res: Response) => {
		const cpfToUnlock = new cpfModel(req.body(cpfModel.schema.obj.cpf));
		quantidade_de_requests++;

		if (isValid(cpfToUnlock) === true) {
			const verifier: number = await cpfModel
				.find({ cpf: cpfToUnlock.cpf })
				.estimatedDocumentCount();
			if (verifier > 0) {
				try {
					cpfToUnlock.deleteOne();
					res
						.status(200)
						.send({ message: 'O CPF informado foi removido da lista' });
					return;
				} catch (err) {
					res.status(500).send({ message: err });
				}
			}
			res.status(200).send({
				message: 'O CPF informado não encontra-se bloqueado!',
			});
		} else {
			res.status(200).send({ message: 'O CPF informado não é valido!' });
		}
	};

	static cpfIsBlocked = async (req: Request, res: Response) => {
		const cpfToFind = new cpfModel(req.body(cpfModel.schema.obj.cpf));
		quantidade_de_requests++;

		if (isValid(cpfToFind) === true) {
			const verifier: number = await cpfModel
				.find({ cpf: cpfToFind.cpf })
				.estimatedDocumentCount();

			if (verifier > 0) {
				res.status(200).send({ message: 'O CPF encontra-se bloqueado' });
			} else {
				res.status(200).send({ message: 'O CPF não encontra-se na lista.' });
			}
		} else {
			res.status(200).send({ message: 'O CPF informado não é valido.' });
		}
	};
	static serverStatus = async (req: Request, res: Response) => {
		quantidade_de_requests++;
		const tempo_online: number = process.uptime();
		const quantidade_de_docs: number = await cpfModel.estimatedDocumentCount();
		res.status(200).send({
			quantidade_de_requests,
			tempo_online,
			quantidade_de_docs,
		});
	};
}
export default CpfController;
