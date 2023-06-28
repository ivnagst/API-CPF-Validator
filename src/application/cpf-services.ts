import { Cpf } from '../domain/cpf';
import { CpfRepository } from '../interfaces/cpf-repository';

export class CpfServices {
	constructor(private readonly cpfRepository: CpfRepository) {}

	async getAllCpfs(): Promise<Cpf[]> {
		return this.cpfRepository.getAllCpfs();
	}
	async addCpf(cpf: Cpf): Promise<void> {
		await this.cpfRepository.addCpf(cpf);
	}
	async deleteCpf(cpf: string): Promise<void> {
		await this.cpfRepository.deleteCpf(cpf);
	}
	async getCpfCount(): Promise<number> {
		return this.cpfRepository.getCpfCount();
	}
}
