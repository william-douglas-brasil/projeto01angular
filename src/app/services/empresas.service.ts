import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  //ENDPOINT da API
  endpoint: string = "http://localhost:8080/api/empresas";
  constructor(
    //inicialização por meio de injeção de dependência
    private httpClient: HttpClient
  ) { }
  //função para realizar uma chamada HTTP POST para a API
  post(empresa: any) {
    return this.httpClient.post(this.endpoint, empresa);
  }
  //função para realizar uma chamada HTTP PUT para a API
  put(empresa: any) {
    return this.httpClient.put(this.endpoint, empresa);
  }
  //função para realizar uma chamada HTTP DELETE para a API
  delete(idEmpresa: number) {
    return this.httpClient.delete(this.endpoint + "/" + idEmpresa);
  }
  //função para retornar todas as empresas cadastradas
  getAll() {
    return this.httpClient.get(this.endpoint);
  }
  //função para retornar os dados de 1 empresa atraves do id
  getById(idEmpresa: number) {
    return this.httpClient.get(this.endpoint + "/" + idEmpresa);
  }
}