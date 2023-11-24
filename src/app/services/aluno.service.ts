import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aluno } from '../model/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/aluno';

  constructor(private httpClient: HttpClient) { }

  async fazerLogin(email: string, senha: string) {
    let urlAuxiliar = this.url + "/" + email + "/" + senha + "/authenticate";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }


  salvarAlunoAutenticado(aluno: Aluno) {
    localStorage.setItem('alunoAutenticado', JSON.stringify(aluno));
  }

  alunoAutenticar() {
    return JSON.parse(localStorage.getItem('alunoAutenticado') || "[]");
  }

  async isAlunoExists(email: String) {
    let urlAuxiliar = this.url + "/" + email + '/exists';
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(aluno: Aluno) {
    if (aluno.idAluno === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(aluno), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(aluno), this.httpHeaders).toPromise();
    }
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }
}