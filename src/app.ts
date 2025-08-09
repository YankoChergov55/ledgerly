import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import httpLogger from './middleware/httpLogger.js';
import logger from './utils/logger.js';
import appConfig from './config/appConfig.js';
import { errorHandler } from './middleware/errorHandler.js';
import { dataRes } from './types/response.js';
import expenseRoutes from './expenses/expenses.routes.js';
import { connectDB, closeDB } from './config/db.js';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(httpLogger);

await connectDB();

app.get('/', (req: Request, res: Response<dataRes>) => {
	res.json({
		success: true,
		statusCode: 200,
		message: 'welcome to ledgerly',
	});
});

app.use('/api/expenses', expenseRoutes);

app.use(errorHandler);

app.listen(appConfig.port, () => {
	logger.info(`running on port ${appConfig.port}`);
});

process.on('SIGINT', async () => {
	await closeDB();
	process.exit(0);
});

process.on('SIGTERM', async () => {
	await closeDB();
	process.exit(0);
});

process.on('beforeExit', async () => {
	await closeDB();
});
