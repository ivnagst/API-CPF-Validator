import 'reflect-metadata';
import { ContainerModule } from 'inversify';
import Server from '../user-interface/server/server';
import { Configuration } from '../infrastructure/config/configuration';
import DBConnection from '../infrastructure/database/db-connection';
import TYPES from './ioc-types';
import CpfServices from '../application-core/services/cpf-services';
import RequestCounter from '../infrastructure/request-counter';

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
