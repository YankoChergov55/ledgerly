import dotenv from 'dotenv';

dotenv.config({
	quiet: true,
});

interface IConfig {
	port: number;
	nodeEnv: string;
	dbHost: string;
	dbPort: number;
	dbUser: string;
	dbPassword: string;
	dbName: string;
}

function requireEnv(varName: string): string {
	const value = process.env[varName];
	if (!value) {
		throw new Error(`Missing required environment variable: ${varName}`);
	}
	return value;
}

const appConfig: IConfig = {
	port: Number(process.env.PORT) || 8080,
	nodeEnv: String(process.env.NODE_ENV) || 'development',
	dbHost: requireEnv('DB_HOST'),
	dbPort: Number(requireEnv('DB_PORT')),
	dbUser: requireEnv('DB_USER'),
	dbPassword: requireEnv('DB_PASSWORD'),
	dbName: requireEnv('DB_NAME'),
};

export default appConfig;
