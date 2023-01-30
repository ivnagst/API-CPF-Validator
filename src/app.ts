import './controllers/cpfsController';
import Server from './config/serverInitialize';
// import ConfigFactory from './config/configFactory';

const server = new Server();

void server.initializeServer();
