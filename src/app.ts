import './controllers/cpfsController';
import Server from './config/serverInitialize';
import myContainer from './ioc/ioc-bind';
import { Container } from 'inversify';

export function startServer() {
	const container = new Container({});
	container.load(myContainer());

	const server = container.get(Server);

	void server.initializeServer();
}
