import pino, { Logger } from 'pino';

const logger: Logger = pino.default({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		},
	},
});

export default logger;
