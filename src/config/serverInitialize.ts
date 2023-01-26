import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import DBConnection from './dbConnect';
import myContainer from '../ioc/ioc-bind';
import config from 'config';

class Server {
	public container: Container;

	private PORT: number;

	constructor() {
		this.PORT = config.get<number>('PORT');
		this.container = new Container({});
		this.container.load(myContainer());
	}
	public async initializeServer() {
		const server = new InversifyExpressServer(this.container);
		const serverInstance = server.build();
		const db: DBConnection = this.container.get('DBConnection');
		await db.connect();
		try {
			serverInstance.listen(this.PORT, () => {
				console.log(`Servidor sendo escutado na porta ${this.PORT}`);
			});
		} catch (err) {
			console.error(err);
		}
	}
}

export default Server;
