import { Plano } from "./plano-enum";

export class Cliente {
    nome: string;
    email: string;
    telefone: string;
    cnpj: string;
    nomeResponsavel: string;
    cpfResponsavel: string;
    nomePlano: Plano | null;;
    saldo: number| null;;
    creditoUtilizado: number| null;
    limiteCredito: number | null;

    constructor(
        nome: string,
        email: string,
        telefone: string,
        cnpj: string,
        nomeResponsavel: string,
        cpfResponsavel: string,
        nomePlano: Plano | null,
        saldo: number | null,
        creditoUtilizado: number | null,
        limiteCredito: number | null
        ) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cnpj = cnpj;
        this.nomeResponsavel = nomeResponsavel;
        this.cpfResponsavel = cpfResponsavel;
        this.nomePlano = nomePlano;
        this.saldo = saldo;
        this.creditoUtilizado = creditoUtilizado;
        this.limiteCredito = limiteCredito;
    }
}
