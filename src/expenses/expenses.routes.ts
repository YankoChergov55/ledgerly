import { Router } from 'express';
import { createExpense, deleteExpense, getAllExpenses, getExpense, updateExpense } from './expenses.controller.js';

const expRouter = Router();

//create an expense
expRouter.post('/', createExpense);

//get an expense
expRouter.get('/:id', getExpense);

//update an expense
expRouter.put('/:id', updateExpense);

//delete an expense
expRouter.delete('/:id', deleteExpense);

//get all expenses
expRouter.get('/', getAllExpenses);

export default expRouter;
