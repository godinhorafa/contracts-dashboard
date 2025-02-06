export function formatDateToBrazilian(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

export function formatCurrencyValue(value: string): number {
    return Number(value.replace(/[^\d,]/g, '').replace(',', '.'));
}