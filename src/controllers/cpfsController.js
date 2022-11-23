import cpfModel from "../models/Cpf.js";
import isValid from "../controllers/cpfValidator.js"

let quantidade_de_requests = 0;
let quantidade_de_documentos_na_collection = 0;

class CpfsController {

    static blockCPF = (req, res) => {
        const cpfToLock = new cpfModel(req.params);

        quantidade_de_requests++

        if (isValid(cpfToLock.cpf) !== false ) {

            cpfToLock.save((err, docs) => {
                if (!err) {
                    res
                        .status(201)
                        .json({ message: `O CPF ${cpfModel(req.params).cpf} foi bloqueado com sucesso!`, docs })
                    return;
                } else {
                    res
                        .status(500)
                        .json({ message: `${err.message} - Falha ao bloquear o CPF!`, cpfToLock })
                    return;

                }
            })
        } else {
            res
                .send({ message: `O CPF informado (${(cpfToLock.cpf)}) não é válido! Por favor, insira um CPF válido.` })
        }
    }
    static unlockCPF = (req, res) => {
        const cpfToUnlock = cpfModel(req.params);
        quantidade_de_requests++

        if (isValid(cpfToUnlock.cpf) !== false) {
            cpfModel.findOneAndDelete({ cpfs: { cpf: cpfToUnlock } }, function (err, docs) {
                if (!docs) {
                    res
                        .status(201)
                        .send({ message: `O CPF informado (${cpfModel(req.params).cpf}) não encontra-se bloqueado` });
                    return;
                }
                if (!err || docs) {
                    res
                        .status(203)
                        .send({ message: `O CPF informado (${cpfModel(req.params).cpf}) foi removido da lista: `, docs });
                }
                else {
                    res
                        .status(500)
                        .send({ message: `${err.message} - Falha ao desbloquear o CPF!` });
                    return;
                }
            })
        } else {
            res
                .send({ message: `O CPF informado (${(cpfToUnlock.cpf)}) não é valido!` })
        }
    }
    static cpfIsBlocked = (req, res) => {
        const cpfToFind = cpfModel(req.params);
        quantidade_de_requests++

        if (isValid(cpfToFind.cpf) !== false) {
            cpfModel.findOne({ cpfs: { cpf: cpfToFind } }, function (err, docs) {
                if (!err && docs) {
                    res
                        .status(200)
                        .send({ message: `O CPF da sua consulta (${cpfModel(req.params).cpf}), encontra-se bloqueado`, docs });
                    return;
                }
                else if (err || !docs) {
                    res
                        .status(200)
                        .send({ message: "O CPF da sua consulta, NÃO encontra-se bloqueado: " })
                    return;
                }
            })
        } else {
            res
                .send({ message: `O CPF informado (${(cpfToFind.cpf)}) não é valido!` })
        }
    }

    static serverStatus = (req, res) => {
        quantidade_de_requests++;
        const tempo_online = process.uptime()
            ;

        cpfModel.count({}, function (err, count) {
            quantidade_de_documentos_na_collection = count
        })
        res
            .status(200)
            .json(
                {
                    quantidade_de_requests,
                    tempo_online,
                    quantidade_de_documentos_na_collection

                })
    }
}

export default CpfsController
