import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import DBConnection from './dbConnect';

// const container = new Container({});
class Server {
	private container: Container | undefined;

	async initialize() {
		this.container = new Container({
			defaultScope: 'Singleton',
			autoBindInjectable: true,
		});
		this.container.bind('DBConnection').to(DBConnection).inSingletonScope;
		const db: DBConnection = this.container.get('DBConnection');
		await db.connect();
		const server = new InversifyExpressServer(this.container);
		// console.log(server);
		const serverInstance = server.build();
		try {
			serverInstance.listen(3030, () => {
				console.log('Server listening on port 3030');
			});
		} catch (err) {
			console.error(err);
		}
	}
}

export default Server;
