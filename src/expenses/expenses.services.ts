import { getDB } from '../config/db.js';
import { ExpenseInput, ExpenseUpdate } from '../types/expenseInput.js';
import { AppError } from '../utils/appError.js';

export async function newExpense(data: ExpenseInput) {
	const db = getDB();
	const { id, name, descr = '', price, user_id, category_id } = data;
	const query = `
		INSERT INTO expenses (id, name, descr, price, user_id, category_id)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING *;`;
	const values = [id, name, descr, price, user_id, category_id];
	const result = await db.query(query, values);
	return result.rows[0];
}

export async function findID(id: string) {
	const db = getDB();
	const query = `SELECT * FROM expenses WHERE id = $1`;
	const result = await db.query(query, [id]);
	if (result.rows.length === 0) return null;
	return result.rows[0];
}

export async function changeID(id: string, update: ExpenseUpdate) {
	const db = getDB();

	// Whitelist columns
	const COLS: Record<string, string> = {
		name: 'name',
		descr: 'descr',
		price: 'price',
		category_id: 'category_id',
	};

	const fields: string[] = [];
	const values: any[] = [];

	let idx = 1;
	for (const [k, v] of Object.entries(update)) {
		if (v === undefined) continue; // skip undefineds
		const col = COLS[k];
		if (!col) continue; // ignore unknown keys
		fields.push(`${col} = $${idx++}`);
		values.push(v);
	}

	if (fields.length === 0) {
		throw new Error('No update fields provided');
	}

	// WHERE placeholder index is current idx
	values.push(id);

	const query = `
    UPDATE expenses
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${idx}
    RETURNING *;`;

	const result = await db.query(query, values);
	return result.rows[0];
}

export async function deleteID(id: string) {
	const db = getDB();
	const query = `DELETE FROM expenses WHERE id = $1 RETURNING *;`;
	const result = await db.query(query, [id]);
	return result.rows[0]; // returns deleted record, or null
}

export async function listExpenses() {
	const db = getDB();
	const query = `SELECT * FROM expenses ORDER BY created_at DESC;`;
	const result = await db.query(query);
	return result.rows;
}
