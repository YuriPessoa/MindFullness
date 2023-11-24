import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';
import { Aluno } from 'src/app/model/aluno';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss']
})
export class CadastroPage implements OnInit {
  aluno: Aluno;
  formGroup: FormGroup;

  constructor(private alunoService: AlunoService, private activedRoute: ActivatedRoute, private toastController:
    ToastController, private navController: NavController, private formBuilder:
      FormBuilder) {
    this.aluno = new Aluno();

    this.formGroup = this.formBuilder.group({
      'nome': [this.aluno.nome, Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      'idade': [, Validators.compose([
        Validators.required,
        Validators.min(12)
      ])],
      'email': [this.aluno.email, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(2)
      ])],
      'senha': [this.aluno.senha, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])]
    })

    let id = this.activedRoute.snapshot.params['id'];
    if (id != null) {
      this.alunoService.buscarPorId(parseFloat(id)).then((json) => {
        this.aluno = <Aluno>(json);
        this.formGroup.get('nome')?.setValue(this.aluno.nome);
        this.formGroup.get('idade')?.setValue(this.aluno.idade);
        this.formGroup.get('email')?.setValue(this.aluno.email);
        this.formGroup.get('senha')?.setValue(this.aluno.senha);
      });

    }
  }

  ngOnInit() {
  }

  salvar() {
    let nome = this.formGroup.value.nome;
    let email = this.formGroup.value.email;
    let senha = this.formGroup.value.senha;
    let idade = this.formGroup.value.idade;

    this.alunoService.isAlunoExists(email).then((json) => {
      let resposta = <Aluno>(json);

      if (resposta !== null) {
        this.exibirMensagem("Este e-mail já está sendo utilizado!!!");
      } else {
        this.aluno.nome = nome;
        this.aluno.email = email;
        this.aluno.senha = senha;
        this.aluno.idade = idade;

        this.alunoService.salvar(this.aluno).then((json) => {
          this.aluno = <Aluno>(json);
          if (this.aluno) {
            this.exibirMensagem('Usuário registrado com sucesso!');
            this.navController.navigateBack('/login');
            this.alunoService.salvarAlunoAutenticado(this.aluno);
          } else {
            this.exibirMensagem('Erro ao salvar o registro!')
          }
        })
          .catch((error) => {
            this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
          });
      }
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
