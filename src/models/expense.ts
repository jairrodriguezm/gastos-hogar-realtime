export type Person = 'Jair' | 'Anyelly';

export interface Expense {
    id: string;
    name: string;
    amount: number;
    person: Person;
    month: string;
}