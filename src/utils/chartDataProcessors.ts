import { Contract } from "@/types/contract";

export const processMonthlyData = (contracts: Contract[]) => {
    const monthlyStats = new Map();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    contracts.forEach(contract => {
        const date = new Date(contract["Data de Início"].split('/').reverse().join('-'));
        const month = months[date.getMonth()];

        if (!monthlyStats.has(month)) {
            monthlyStats.set(month, { month, ativos: 0, expirados: 0, renovados: 0 });
        }

        const stats = monthlyStats.get(month);
        if (contract.Status === "Ativo") stats.ativos++;
        else if (contract.Status === "Expirado") stats.expirados++;
        else if (contract.Status === "Pendente de Renovação") stats.renovados++;
    });

    return Array.from(monthlyStats.values());
};

export const processValueData = (contracts: Contract[]) => {
    const valueStats = new Map();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    contracts.forEach(contract => {
        const date = new Date(contract["Data de Início"].split('/').reverse().join('-'));
        const month = months[date.getMonth()];

        if (!valueStats.has(month)) {
            valueStats.set(month, { month, valor: 0 });
        }

        const stats = valueStats.get(month);
        const valor = parseFloat(contract["Valor do Contrato"].replace('R$ ', '').replace('.', '').replace(',', '.'));
        stats.valor += valor;
    });

    return Array.from(valueStats.values());
};