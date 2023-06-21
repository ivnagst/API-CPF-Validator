import { Cpf } from '../domain/Cpf';
import { CpfRepository } from '../interfaces/cpfRepository';

export class CpfServices {
	constructor(private readonly cpfRepository: CpfRepository) {}

	async getAllCpfs(): Promise<Cpf[]> {
		return this.cpfRepository.getAllCpfs();
	}

	async addCpf(cpf: Cpf): Promise<void> {
		await this.cpfRepository.addCpf(cpf);
	}

	async deleteCpf(cpfNumber: string): Promise<void> {
		await this.cpfRepository.deleteCpf(cpfNumber);
	}

	async getCpfCount(): Promise<number> {
		return this.cpfRepository.getCpfCount();
	}
}
