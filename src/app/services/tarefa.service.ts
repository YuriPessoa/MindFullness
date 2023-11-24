import { Injectable } from '@angular/core';
import { Tarefa } from '../model/tarefa'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/tarefa';

  constructor(private httpClient: HttpClient) { }

  async salvar(tarefa: Tarefa) {
    if (tarefa.idTarefa === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(tarefa), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(tarefa), this.httpHeaders).toPromise();
    }
  }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorIdAluno(idAluno: number) {
    let urlAuxiliar = this.url + "/aluno/" + idAluno;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }
}