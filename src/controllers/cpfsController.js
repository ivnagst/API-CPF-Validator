import cpfModel from "../models/Cpf.js";
import isValid from "../controllers/cpfValidator.js"

let quantidade_de_requests = 0;

class CpfController {
    static blockCPF = async (req, res) => {
        const cpfToLock = new cpfModel(req.params);
        quantidade_de_requests++

        if (isValid(cpfToLock.cpf) === true) {

            const verifier = await cpfModel
                .find({ cpfs: { cpf: cpfToLock } })
                .estimatedDocumentCount();

            if (verifier < 1) {
                cpfToLock.save((err) => {
                    if (!err) {
                        res
                            .status(201)
                            .send({ message: `O CPF ${(cpfToLock.cpf)} foi bloqueado com sucesso!` })
                        return;
                    }
                })
            }
            else {
                res
                    .send({ message: `O CPF informado (${(cpfToLock.cpf)}) já encontra-se na base de dados!` })
            }
        }
        else {
            res
                .send({ message: `O CPF informado (${(cpfToLock.cpf)}) não é valido!` })
        }
    }
    static unlockCPF = (req, res) => {
        quantidade_de_requests++
        const cpfToUnlock = cpfModel(req.params);

        if (isValid(cpfToUnlock.cpf) === true) {
            cpfModel.findOneAndDelete({ cpfs: { cpf: cpfToUnlock } }, function (err, docs) {
                if (!docs) {
                    res
                        .status(201)
                        .send({ message: `O CPF informado (${cpfModel(req.params).cpf}) não encontra-se bloqueado!` });
                    return;
                }
                if (!err && docs) {
                    res
                        .status(201)
                        .send({ message: `O CPF informado (${cpfModel(req.params).cpf}) foi removido da lista` })
                    return;
                }
            })
        }
        else {
            res
                .send({ message: `O CPF informado (${(cpfToUnlock.cpf)}) não é valido!` })
        }
    }
    static cpfIsBlocked = (req, res) => {
        quantidade_de_requests++
        const cpfToFind = cpfModel(req.params);

        if (isValid(cpfToFind.cpf) === true) {
            cpfModel.findOne({ cpfs: { cpf: cpfToFind } }, function (err, docs) {
                if (!err && docs) {
                    res
                        .status(200)
                        .send({ message: `O CPF da sua consulta (${cpfModel(req.params).cpf}), encontra-se bloqueado` });
                    return;
                }
                if (err || !docs) {
                    res
                        .status(200)
                        .send({ message: "O CPF da sua consulta, NÃO encontra-se bloqueado!" })
                    return;
                }
            })
        }
        else {
            res
                .send({ message: `O CPF informado (${(cpfToFind.cpf)}) não é valido!` })
        }
    }
    static serverStatus = async (req, res) => {
        quantidade_de_requests++;
        const tempo_online = process.uptime();
        const quantidade_de_docs = await cpfModel.estimatedDocumentCount(); //
        res
            .status(200)
            .send(
                {
                    quantidade_de_requests,
                    tempo_online,
                    quantidade_de_docs
                })
    }
}
export default CpfController
