import TYPES from 'src/ioc/ioc-types';
import { Container } from 'inversify';
import Server from 'src/config/serverInitialize';
import DBConnection from 'src/config/dbConnect';
import CpfServices from 'src/services/cpfServices';

export default async function (container: Container): Promise<void> {
	container.bind('DBConnection').to(DBConnection).inSingletonScope;
	container.bind('Server').to(Server).inSingletonScope;
}
const container = new Container({});
container.bind('CpfServices').to(CpfServices);
