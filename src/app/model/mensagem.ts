export class Mensagem {
    cnpjCliente: string;
    mensagem: string;
    telefone: string;
    tipoMensagem: string;

    constructor(
        cnpjCliente: string,
        mensagem: string,
        telefone: string,
        tipoMensagem: string
    
        ) {
        this.cnpjCliente = cnpjCliente;
        this.mensagem = mensagem;
        this.telefone = telefone;
        this.tipoMensagem = tipoMensagem;
    }
}
