import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import httpLogger from './middleware/httpLogger.js';
import logger from './utils/logger.js';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(httpLogger);

app.get('/', (req: Request, res: Response) => {
	res.json({
		status: '200',
		message: 'welcome to ledgerly',
	});
});

app.listen(3000, () => {
	logger.info(`running on port 3000`);
});
