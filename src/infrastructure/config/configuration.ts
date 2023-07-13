import { injectable } from 'inversify';
import { get } from 'lodash';

interface Config {
	DB_URI: string;
	PORT: number;
}

@injectable()
export class Configuration {
	private readonly config: Config;

	constructor() {
		const defaultConfig: Config = {
			DB_URI: get(process.env, 'DB_URI', 'default_db_uri'),
			PORT: parseInt(get(process.env, 'PORT', 'default_port')),
		};

		this.config = { ...defaultConfig };
	}

	getConfig(): Config {
		return this.config;
	}
}
