import { Contract } from "@/types/contract";
import { formatCurrencyValue } from "./formatters";

export const processMonthlyData = (contracts: Contract[]) => {
    const monthlyStats = new Map();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    contracts.forEach(contract => {
        const [day, month, year] = contract["Data de Início"].split('/');
        const date = new Date(`${year}-${month}-${day}`);
        const monthKey = months[date.getMonth()];

        if (!monthlyStats.has(monthKey)) {
            monthlyStats.set(monthKey, { month: monthKey, ativos: 0, expirados: 0, renovados: 0 });
        }

        const stats = monthlyStats.get(monthKey);
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
        const [day, month, year] = contract["Data de Início"].split('/');
        const date = new Date(`${year}-${month}-${day}`);
        const monthKey = months[date.getMonth()];

        if (!valueStats.has(monthKey)) {
            valueStats.set(monthKey, { month: monthKey, valor: 0 });
        }

        const stats = valueStats.get(monthKey);
        const valor = formatCurrencyValue(contract["Valor do Contrato"]);
        stats.valor += valor;
    });

    return Array.from(valueStats.values());
};