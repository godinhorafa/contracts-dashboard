export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export function parseCurrency(value: string): number {
    // Se o valor for nulo ou vazio, retorna 0
    if (!value) return 0;

    // Remove R$, espaços, e pontos de milhar
    const cleanValue = value.replace(/[R$\s.]/g, '');

    // Substitui a vírgula por ponto e converte para número
    const numberValue = Number(cleanValue.replace(',', '.'));

    // Verifica se é um número válido
    return isNaN(numberValue) ? 0 : numberValue;
}
