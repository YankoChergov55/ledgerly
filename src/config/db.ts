import { Pool } from 'pg';
import logger from '../utils/logger.js';
import appConfig from './appConfig.js';
import { AppError } from '../utils/appError.js';

let pool: Pool | null = null;

export async function connectDB() {
	if (pool) return pool;

	pool = new Pool({
		host: appConfig.dbHost,
		port: appConfig.dbPort,
		user: appConfig.dbUser,
		password: appConfig.dbPassword,
		database: appConfig.dbName,
		max: 10,
		idleTimeoutMillis: 30_000,
	});

	try {
		await pool.query('SELECT 1');
		logger.info('[db] connected to PostgreSQL');
	} catch (error) {
		logger.error(error);
		process.exit(1);
	}

	return pool;
}

export function getDB(): Pool {
	if (!pool) throw new AppError(500, 'PostgreSQL could not connect', 'DB_CONNECTION_FAIL');
	return pool;
}

export async function closeDB() {
	if (pool) {
		await pool.end();
		pool = null;
		logger.info('[db] Connection closed');
	}
}
