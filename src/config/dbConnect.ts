import mongoose from 'mongoose';
import config from 'config';
import { injectable } from 'inversify';
mongoose.set('strictQuery', true);

@injectable()
export default class DBConnection {
	private DB_URI: string;
	constructor() {
		this.DB_URI = config.get<string>('DB_URI');
	}

	public async connect(): Promise<mongoose.Connection> {
		try {
			await mongoose.connect(this.DB_URI);
			console.log('Conexão com o banco de dados realizada com sucesso xD');
			return mongoose.connection;
		} catch (err) {
			console.log('Erro ao se conectar ao BD :/', err);
			process.exit(1);
		}
	}
}
