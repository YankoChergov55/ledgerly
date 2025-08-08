import logger from '../utils/logger.js';
import pinoHttp from 'pino-http';

const httpLogger = pinoHttp.default({
	logger,
	customSuccessMessage: function (req, res) {
		return `${req.method} ${req.url} completed with ${res.statusCode}`;
	},
	customErrorMessage: function (req, res, err) {
		return `${req.method} ${req.url} failed with ${err.message}`;
	},
});

export default httpLogger;
