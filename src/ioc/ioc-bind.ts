import 'reflect-metadata';
import { ContainerModule } from 'inversify';
import Server from '../config/server-initialize';
import DBConnection from '../config/db-connect';
import CpfServices from '../services/cpf-services';
import TYPES from './ioc-types';
import { Configuration } from '../config/config-factory';
import RequestCounter from '../services/requestCounter';

function myContainer() {
	return new ContainerModule((bind) => {
		bind(TYPES.CpfServices).to(CpfServices).inSingletonScope();
		bind(Configuration).to(Configuration).inSingletonScope();
		bind('DBConnection').to(DBConnection).inSingletonScope();
		bind(Server).toSelf().inSingletonScope();
		bind(RequestCounter).toSelf().inSingletonScope();
	});
}

export default myContainer;
