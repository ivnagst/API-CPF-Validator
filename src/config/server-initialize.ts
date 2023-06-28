import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, injectable } from 'inversify';
import DBConnection from './db-connect';
import myContainer from '../ioc/ioc-bind';
import { Configuration } from './config-factory';

@injectable()
class Server {
	public container: Container;
	private configuration: Configuration;
	private PORT: number;

	constructor() {
		this.container = new Container({});
		this.container.load(myContainer());
		this.configuration = this.container.get(Configuration);
		this.PORT = this.configuration.getConfig().PORT;
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
