import mongoose from 'mongoose';
// import config from 'config';
import { injectable, inject } from 'inversify';
mongoose.set('strictQuery', true);
import { Configuration } from './configFactory';

@injectable()
export default class DBConnection {
	private DB_URI: string;

	constructor(@inject(Configuration) private readonly config: Configuration) {
		this.DB_URI = this.config.getConfig().DB_URI;
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
