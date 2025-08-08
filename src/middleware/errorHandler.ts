import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.js';
import { AppError } from '../utils/appError.js';

interface errResponse {
	success: boolean;
	statusCode: number;
	message: string;
	code?: string | undefined;
	err: AppError | Error | unknown;
} // interface to help define and type safe the response from the handler

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
	logger.error(err); // logging the error with Pino so that it is visible to devs

	//outside code, message and code variables in order to be able to set those parameters based on error type
	let httpCode = 500;
	let message = 'something broke';
	let code: string | undefined = 'SERVER_ERROR';

	if (err instanceof AppError) {
		httpCode = err.status;
		message = err.message;
		code = err.code;
	}

	//handler response object getting the infromation that has been set in the handler
	let handlerRes: errResponse = {
		success: false,
		statusCode: httpCode,
		code: code,
		message: message,
		err: {
			name: err.name,
			message: err.message,
			stack: (err as Error).stack,
		},
	};

	//response from the handler that sets the code and returns the object that has been built
	res.status(httpCode).json(handlerRes);
};
