import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Descricao } from '../model/descricao';

@Injectable({
  providedIn: 'root'
})
export class DescricaoService {
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/descricao';

  constructor(private httpClient: HttpClient) { }

  async buscarPorId(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async salvar(descricao: Descricao) {
    if (descricao.idDescricao === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(descricao), this.httpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(descricao), this.httpHeaders).toPromise();
    }
  }

  async excluir(id: number) {
    let urlAuxiliar = this.url + "/" + id;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listarPorIdDiario(idDiario: number) {
    let urlAuxiliar = this.url + "/diario/" + idDiario;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }
}
