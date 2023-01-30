import 'reflect-metadata';
import { ContainerModule } from 'inversify';
import Server from '../config/serverInitialize';
import DBConnection from '../config/dbConnect';
import CpfServices from '../services/cpfServices';
import TYPES from './ioc-types';
import { Configuration } from '../config/configFactory';

function myContainer() {
	return new ContainerModule((bind) => {
		bind(TYPES.CpfServices).to(CpfServices).inSingletonScope();
		bind(Configuration).to(Configuration).inSingletonScope();
		bind('DBConnection').to(DBConnection).inSingletonScope();
		bind(Server).toSelf().inSingletonScope();
	});
}

export default myContainer;
