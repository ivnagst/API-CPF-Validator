import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import DBConnection from './dbConnect';
import myContainer from '../ioc/ioc-bind';

class Server {
	public container: Container;

	constructor() {
		this.container = new Container({});
		this.container.load(myContainer());
	}
	public async initializeDb() {
		const db: DBConnection = this.container.get('DBConnection');
		await db.connect();
	}
	public initializeServer() {
		const server = new InversifyExpressServer(this.container);
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
