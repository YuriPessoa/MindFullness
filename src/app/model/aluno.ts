export class Aluno { 
    idAluno: number;
    email: string;
    nome: string;
    idade: number;
    senha: string;

    constructor() {
        this.idAluno = 0;
        this.email = '';
        this.nome = '';
        this.idade = 0;
        this.senha = '';
    }
}
