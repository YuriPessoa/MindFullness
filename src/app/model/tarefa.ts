export class Tarefa {
    idTarefa: number;
    idAluno: number;
    descricao: string;
    dataTermino: string;
    situacao: boolean;

    constructor() {
        this.idTarefa = 0;
        this.idAluno = 0;
        this.descricao = "";
        this.dataTermino = "";
        this.situacao = false;
    }
}
