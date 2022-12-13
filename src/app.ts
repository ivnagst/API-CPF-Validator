import express from 'express';
import db from './config/dbConnect';
import routes from './index';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
	console.info('A conexão com o MongoDB realizada com sucesso :D');
});

const app = express();

app.use(express.json());

routes(app);

export default app;
