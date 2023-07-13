import './user-interface/controllers/cpf-controller';
import { Container } from 'inversify';
import Server from './user-interface/server/server';
import myContainer from './ioc/my-container';

export function startServer() {
	const container = new Container({});
	container.load(myContainer());

	const server = container.get(Server);

	void server.initializeServer();
}
