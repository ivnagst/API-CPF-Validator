import 'reflect-metadata';
import './controllers/cpfsController';
// import DBConnection from './config/dbConnect';
import Server from './config/serverInitialize';

// const db = new DBConnection();

const server = new Server();

async function startServer() {
	// await db.connect();
	await server.initialize();
}

void startServer();
