import express, { Express, Request, Response } from 'express';
import cpfs from './routes/cpfsRoutes';

const routes = (app: Express) => {
	app.route('/deny-list').get((req: Request, res: Response) => {
		res.status(200).send({ titulo: 'Verificador de CPF!' });
	});
	app.use(express.json(), cpfs);
};

export default routes;
