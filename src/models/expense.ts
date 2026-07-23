export type Person = 'Jair' | 'Anyelly';

export const EXPENSE_CATEGORIES = [
    'SuperMarket',
    'Utilities',
    'Fruver',
    'House Tool',
    'Medicines',
    'Cleaning',
    'Others',
] as const;

export type Category = typeof EXPENSE_CATEGORIES[number];

export interface Expense {
    id: string;
    name: string;
    amount: number;
    person: Person;
    month: string;
    category?: string | null;
}