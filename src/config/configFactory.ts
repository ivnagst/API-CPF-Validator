import { injectable } from 'inversify';

interface Config {
	DB_URI: string;
	PORT: number;
}

@injectable()
export class Configuration {
	private readonly config: Config;

	constructor() {
		const defaultConfig: Config = {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			DB_URI: process.env.DB_URI!,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			PORT: parseInt(process.env.PORT!),
		};

		this.config = { ...defaultConfig };
	}

	getConfig(): Config {
		return this.config;
	}
}
