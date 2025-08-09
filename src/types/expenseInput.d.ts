export interface ExpenseInput {
	id: number;
	name: string;
	descr?: string;
	price: number;
	user_id: number;
	category_id: number;
}

export type ExpenseUpdate = Partial<ExpenseInput>;
