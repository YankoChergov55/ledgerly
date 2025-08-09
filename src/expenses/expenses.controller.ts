import { Request, Response, NextFunction } from 'express';
import { dataRes } from '../types/response.js';
import { changeID, deleteID, findID, listExpenses, newExpense } from './expenses.services.js';
import { ExpenseInput, ExpenseUpdate } from '../types/expenseInput.js';
import { AppError } from '../utils/appError.js';

export const createExpense = async (req: Request<ExpenseInput>, res: Response<dataRes>, next: NextFunction) => {
	try {
		const newExp = req.body;

		const created = await newExpense(newExp);

		if (!created) {
			throw new AppError(500, 'Failed to create expense. Try again');
		}

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: 'place to create expenses',
			data: created,
		});
	} catch (error) {
		next(error);
	}
};

export const getExpense = async (req: Request, res: Response<dataRes>, next: NextFunction) => {
	try {
		const id = req.params.id;

		const found = await findID(id);

		if (!found) {
			throw new AppError(404, 'Cannot find expense with this id');
		}

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: 'place to get further details on an expense',
			data: found,
		});
	} catch (error) {
		next(error);
	}
};

export const updateExpense = async (req: Request<ExpenseUpdate>, res: Response<dataRes>, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const update = req.body;

		const expUpdate = await changeID(id, update);

		if (!expUpdate) {
			throw new AppError(404, 'Cannot find and update with this id');
		}

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: 'place to update an expense',
			data: {
				id,
				expUpdate,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const deleteExpense = async (req: Request, res: Response<dataRes>, next: NextFunction) => {
	try {
		const id = req.params.id;

		const deleted = await deleteID(id);

		if (!deleted) {
			throw new AppError(404, 'Cannot delete expense with this id');
		}

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: 'place to delete an expense',
			data: deleted,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllExpenses = async (req: Request, res: Response<dataRes>, next: NextFunction) => {
	try {
		const expenses = await listExpenses();

		if (!expenses) {
			throw new AppError(404, 'No expenses found');
		}

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: 'place to get a list of all expenses',
			data: expenses,
		});
	} catch (error) {
		next(error);
	}
};
