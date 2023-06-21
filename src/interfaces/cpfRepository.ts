import { Cpf } from '../domain/Cpf';

export interface CpfRepository {
  getAllCpfs(): Promise<Cpf[]>;
  addCpf(cpf: Cpf): Promise<void>;
  deleteCpf(cpfNumber: string): Promise<void>;
  getCpfCount(): Promise<number>;
}
