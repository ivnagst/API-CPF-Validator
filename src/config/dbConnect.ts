import mongoose from 'mongoose';
import config from 'config';

class DBConnection {
	private dbUri: string;
	constructor() {
		this.dbUri = config.get<string>('dbUri');
	}

	public async connect(): Promise<mongoose.Connection> {
		try {
			await mongoose.connect(this.dbUri);
			console.log('Conexão com o banco de dados realizada com sucesso xD');
			return mongoose.connection;
		} catch (err) {
			console.log('Erro ao se conectar ao BD', err);
			process.exit(1);
		}
	}
}

export default DBConnection;
