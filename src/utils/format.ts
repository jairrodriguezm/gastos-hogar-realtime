export function formatCOP(value: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(value);
}

export function formatMonthYear(input: string): string {
    const [year, month] = input.split('-');
    const date = new Date(Number(year), Number(month) - 1); // mes base 0

    //   return new Intl.DateTimeFormat('es-CO', {
    //     month: 'long',
    //     year: 'numeric',
    //   }).format(date);

    return `${date.toLocaleString('es-CO', { month: 'long' })} ${year}`;
}