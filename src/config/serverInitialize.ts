import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from '../ioc/ioc-types';
import { CpfServices } from '../services/cpfServices';

const container = new Container({});
container
	.bind<CpfServices>(TYPES.CpfServices)
	.to(CpfServices)
	.inSingletonScope();

class Server {
	initialize() {
		const server = new InversifyExpressServer(container);
		const serverInstance = server.build();
		try {
			serverInstance.listen(3030, () => {
				console.log('Server listening on port 3030');
			});
		} catch (err) {
			console.error(err);
		}
		return this.initialize;
	}
}
export default Server;
