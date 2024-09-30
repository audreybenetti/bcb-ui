import { Plano } from "./plano-enum";

export interface Cliente {
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
    nomeResponsavel: string;
    cpfResponsavel: string;
    nomePlano: Plano;
    saldo: number;
    creditoUtilizado: number;
    limiteCredito: number;
    dataCadastro: string;
}