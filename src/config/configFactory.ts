import { injectable } from 'inversify';

interface Config {
	DB_URI: string;
	PORT: number;
}

@injectable()
export class Configuration {
	private readonly config: Config;

	constructor(overrides?: Partial<Config>) {
		const defaultConfig: Config = {
			DB_URI:
				'mongodb+srv://root:123123123@cluster0.kssgfqn.mongodb.net/cpfValidator',
			PORT: 3030,
		};

		this.config = { ...defaultConfig, ...overrides };
	}

	getConfig(): Config {
		return this.config;
	}
}
