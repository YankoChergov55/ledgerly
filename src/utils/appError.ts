export class AppError extends Error {
	public status: number;
	public isOperational: boolean;
	public code?: string;

	constructor(status: number, message: string, code?: string, isOperational = true) {
		super(message);
		this.status = status;
		this.code = code;
		this.isOperational = isOperational;
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}
