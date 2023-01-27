import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpresasService } from '../services/empresas.service';

@Component({
  selector: 'app-cadastro-empresas',
  templateUrl: './cadastro-empresas.component.html',
  styleUrls: ['./cadastro-empresas.component.css']
})
export class CadastroEmpresasComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = "";
  mensagem_erro: string = "";

  constructor(
    private empresasService: EmpresasService
    //injeção de dependência
  ) { }
  //definindo o formulário
  formCadastro = new FormGroup({
    //campo 'nomeFantasia'
    nomeFantasia: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150)
    ]),
    //campo 'razaoSocial'
    razaoSocial: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150)
    ]),
    //campo 'cnpj'
    cnpj: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      Validators.maxLength(20)
    ]),
  });
  //função utilizada para exibir as mensagens
  //de erro de validação na página
  get form(): any {
    return this.formCadastro.controls;
  }
  //função executada sempre que o componente é renderizado
  ngOnInit(): void {
  }
  //função executada ao clicarmos no botão SUBMIT do formulário
  onSubmit(): void {
    //limpar as mensagens
    this.mensagem_sucesso = "";
    this.mensagem_erro = "";
    //fazendo uma chamada POST para a API..
    this.empresasService.post(this.formCadastro.value)
      .subscribe( //captura a resposta da API
        (data: any) => { //resposta de sucesso da API
          //exibir a mensagem de sucesso na página
          this.mensagem_sucesso = data.mensagem;
          //limpar os campos do formulário
          this.formCadastro.reset();
        },
        (e: any) => { //resposta de erro da API
          //exibir mensagem de erro
          this.mensagem_erro = e.error.mensagem;
        }
      )
  }
}
