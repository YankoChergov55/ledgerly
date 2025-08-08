import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import httpLogger from './middleware/httpLogger.js';
import logger from './utils/logger.js';
import appConfig from './config/appConfig.js';
import { errorHandler } from './middleware/errorHandler.js';
import { dataRes } from './types/response.js';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(httpLogger);

app.get('/', (req: Request, res: Response<dataRes>) => {
	res.json({
		success: true,
		statusCode: 200,
		message: 'welcome to ledgerly',
	});
});

app.use(errorHandler);

app.listen(appConfig.port, () => {
	logger.info(`running on port ${appConfig.port}`);
});
