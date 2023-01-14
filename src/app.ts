import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './ioc/ioc-types';
import { CpfServices } from './services/cpfServices';
import './controllers/cpfsController';

const container = new Container({
	autoBindInjectable: true,
	defaultScope: 'Singleton',
	skipBaseClassChecks: true,
});

container.bind<CpfServices>(TYPES.CpfServices).to(CpfServices);

const server = new InversifyExpressServer(container);

const serverInstance = server.build();
serverInstance.listen(3030, () => {
	console.log('Server listening on port 3030');
});
const db = new DBConnection();
void db.connect();
