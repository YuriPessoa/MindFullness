import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diario } from '../model/diario';
import { Humor } from '../model/humor';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {


  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/diario';

  constructor(private httpClient: HttpClient) { }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarHumorPorIdDiario(idDiario: number) {
    let urlAuxiliar = this.url + "/humor/" + idDiario;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(diario: Diario) {
    if (diario.idDiario === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(diario), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(diario), this.httpHeaders).toPromise();
    }
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async salvarHumor(humor: Humor) {
    let urlAuxiliar = "http://localhost:8087/api/v1/humorDiario";
    return await this.httpClient.post(urlAuxiliar, JSON.stringify(humor), this.httpHeaders).toPromise();
  }

  async buscarPorIdAlunoData(data: string, idAluno: number) {
    let urlAuxiliar = this.url + "/buscar/" + data + "/" + idAluno;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
  
  async buscarPorIdAluno(idAluno: number){
    let urlAuxiliar = this.url + "/buscar/" + idAluno;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
}