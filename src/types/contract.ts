export interface Contract {
    Identificador: string;
    "Nome do Contrato": string;
    "Cliente/Fornecedor": string;
    "Data de Início": string;
    "Data de Vencimento": string;
    "Status": string;
    "Valor do Contrato": string;
    "Tipo de Contrato": string;
}

export type ContractStatus = "Ativo" | "Expirado" | "Pendente de Renovação" | "Próximo ao Vencimento";
export type ContractType = "Serviço" | "Fornecimento" | "Consultoria" | "TI";