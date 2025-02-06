export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export function parseCurrency(value: string): number {
    // Remove o símbolo da moeda e espaços
    const cleanValue = value.replace(/[R$\s.]/g, '');

    // Substitui a vírgula por ponto para converter para número
    const numberValue = cleanValue.replace(',', '.');

    // Converte para número
    return Number(numberValue);
}