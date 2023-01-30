import { InversifyExpressServer } from 'inversify-express-utils';
import { Container, inject } from 'inversify';
import DBConnection from './dbConnect';
import myContainer from '../ioc/ioc-bind';
// import config from 'config';
import { Configuration } from '../config/configFactory';

class Server {
	public container: Container;
	private PORT: number;

	constructor(
		@inject(Configuration) private readonly configuration: Configuration,
	) {
		this.container = new Container({});
		this.container.load(myContainer());
		this.PORT = this.configuration.getConfig().PORT;
		// this.configuration = this.container.get(Configuration);
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
