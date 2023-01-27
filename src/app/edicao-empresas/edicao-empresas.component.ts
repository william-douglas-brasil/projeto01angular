import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpresasService } from '../services/empresas.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edicao-empresas',
  templateUrl: './edicao-empresas.component.html',
  styleUrls: ['./edicao-empresas.component.css']
})
export class EdicaoEmpresasComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private empresasService: EmpresasService, //inicialização
    private activatedRoute: ActivatedRoute //inicialização
  ) { }
  //definindo o formulário
  formEdicao = new FormGroup({
    //campoi 'idEmpresa'
    idEmpresa: new FormControl('', []),
    //campo 'nomeFantasia'
    nomeFantasia: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(150)
    ]),
    //campo 'razaoSocial'
    razaoSocial: new FormControl('', []),
    //campo 'cnpj'
    cnpj: new FormControl('', []),
  });
  //função utilizada para exibir as mensagens
  //de erro de validação na página
  get form(): any {
    return this.formEdicao.controls;
  }
  //função executada sempre que o componente é carregado (aberto)
  ngOnInit(): void {
    //capturando o id da empresa enviado pela URL
    var idEmpresa = this.activatedRoute.snapshot.paramMap.get('id');
    //obtendo os dados da empresa na API
    this.empresasService.getById(Number(idEmpresa))
      .subscribe(
        (data: any) => {
          //preencher o formulário com os dados da empresa
          this.formEdicao.controls['idEmpresa']
            .setValue(data.idEmpresa);
          this.formEdicao.controls['nomeFantasia']
            .setValue(data.nomeFantasia);
          this.formEdicao.controls['razaoSocial']
            .setValue(data.razaoSocial);
          this.formEdicao.controls['cnpj']
            .setValue(data.cnpj);
        },
        (e: any) => {
          console.log(e);
        }
      )
  }
  //evento SUBMIT do formulário
  onSubmit(): void {
    this.empresasService.put(this.formEdicao.value)
      .subscribe(
        (data: any) => {
          this.mensagem_sucesso = data.mensagem;
        },
        (e: any) => {
          this.mensagem_erro = e.error.mensagem;
        }
      );
  }
}
