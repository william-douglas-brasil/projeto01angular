import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../services/empresas.service';
@Component({
  selector: 'app-consulta-empresas',
  templateUrl: './consulta-empresas.component.html',
  styleUrls: ['./consulta-empresas.component.css']
})
export class ConsultaEmpresasComponent implements OnInit {
  //atributo
  empresas: any[] = []; //json array (lista)
  pagina = 1;// armazenando a paginação
  filtro: string = ""; //filtro de busca

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    //inicialização por injeção de dependência
    private empresasService: EmpresasService
  ) { }
  //Evento executado quando o componente carrega
  ngOnInit(): void {
    //fazendo uma consulta de empresas na API
    this.empresasService.getAll()
      .subscribe( //captura o retorno da API
        (data) => { //resposta de sucesso
          //armazenando o retorno da API
          this.empresas = data as any[];
        },
        (e: any) => { //resposta de erro
          console.log(e);
        }
      )
  }
  //função para trocar de página no componente de paginação
  handlePageChange(event: any): void {
    this.pagina = event;
  }
  //função executada para excluir uma empresa
  excluir(id: number): void {
    if (window.confirm('Deseja realmente excluir a empresa selecionada ? ')) {
      //fazendo uma chamada de exclusão na API (DELETE)
      this.empresasService.delete(id)
        .subscribe( //captura o retorno da API (PROMISSE)
          (data: any) => { //resposta de sucesso
            this.mensagem_sucesso = data.mensagem;
            this.ngOnInit(); //executar a consulta novamente
          },
          (e: any) => { //resposta de erro
            this.mensagem_erro = e.error.mensagem;
          }
        );
    }
  }
}

