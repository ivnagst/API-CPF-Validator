import 'reflect-metadata';
import './controllers/cpfsController';
import './ioc/ioc-bind';
import Server from './config/serverInitialize';

const server = new Server();

async function startServer() {
	await server.initializeDb();
	server.initializeServer();
}

void startServer();
