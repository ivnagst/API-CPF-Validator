import cpfModel from "../models/Cpf.js";
import isValid from "../controllers/cpfValidator.js"

let quantidade_de_requests = 0;

class CpfController {
    static blockCPF = async (req, res) => {
        quantidade_de_requests++
        const cpfToLock = new cpfModel(req.params);
        const verifier = await cpfModel.find({ cpfs: { cpf: cpfToLock } }).estimatedDocumentCount();

        if (isValid(cpfToLock.cpf) !== false && verifier < 1) {
            cpfToLock.save((err) => {
                if (!err) {
                    res
                        .status(201)
                        .send({ message: `O CPF ${(cpfToLock.cpf)} foi bloqueado com sucesso!` })
                    return;
                }
                if (err) {
                    res
                        .status(500)
                        .send({ message: `${err.message} - Falha ao bloquear o CPF!`, cpfToLock })
                }
            })
        }
        if (isValid(cpfToLock.cpf) !== true) {
            res
                .send({ message: `O CPF informado (${(cpfToLock.cpf)}) não é valido!` })
        }
        if (verifier > 0) {
            res
                .send({ message: `O CPF informado (${(cpfToLock.cpf)}) já encontra-se na base de dados!` })
        }
    }
    static unlockCPF = (req, res) => {
        quantidade_de_requests++
        const cpfToUnlock = cpfModel(req.params);

        if (isValid(cpfToUnlock.cpf) !== false) {
            cpfModel.findOneAndDelete({ cpfs: { cpf: cpfToUnlock } }, function (err, docs) {
                if (!docs) {
                    res
                        .status(201)
                        .send({ message: `O CPF informado (${cpfModel(req.params).cpf}) não encontra-se bloqueado!` });
                    return;
                }
                if (!err || docs) {
                    res
                        .status(201)
                        .send({ message: `O CPF informado (${cpfModel(req.params).cpf}) foi removido da lista`})
                        .end();
                }
                else {
                    res
                        .status(500)
                        .send({ message: `${err.message} - Falha ao desbloquear o CPF!` });
                    return;
                }
            })
        } if (isValid(cpfToUnlock.cpf) !== true) {
            res
                .send({ message: `O CPF informado (${(cpfToUnlock.cpf)}) não é valido!` })
        }
    }
    static cpfIsBlocked = (req, res) => {
        quantidade_de_requests++
        const cpfToFind = cpfModel(req.params);

        if (isValid(cpfToFind.cpf) !== false) {
            cpfModel.findOne({ cpfs: { cpf: cpfToFind } }, function (err, docs) {
                if (!err && docs) {
                    res
                        .status(200)
                        .send({ message: `O CPF da sua consulta (${cpfModel(req.params).cpf}), encontra-se bloqueado`, docs });
                    return;
                }
                if (err || !docs) {
                    res
                        .status(200)
                        .send({ message: "O CPF da sua consulta, NÃO encontra-se bloqueado!" })
                    return;
                }
            })
        } if (isValid(cpfToFind.cpf) !== true) {
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
