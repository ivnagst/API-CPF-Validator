import 'reflect-metadata';
import db from './config/dbConnect';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './ioc/ioc-types';
import { CpfServices } from './services/cpfServices';
import './controllers/cpfsController';
import * as bodyParser from 'body-parser';

const container = new Container({
	autoBindInjectable: true,
	defaultScope: 'Singleton',
});

container.bind<CpfServices>(TYPES.CpfServices).to(CpfServices);

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
	app.use(
		bodyParser.urlencoded({
			extended: true,
		}),
	);
	// app.use(bodyParser.json());
});

const serverInstance = server.build();
serverInstance.listen(3000, () => {
	console.log('Server listening on port 3000');
});

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
	console.log('Conexão com o banco de dados realizada com sucesso :D');
});
