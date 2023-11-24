import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-dado',
  templateUrl: './dado.page.html',
  styleUrls: ['./dado.page.scss']
})
export class DadoPage implements OnInit {
  aluno: Aluno;
  formGroup: FormGroup;

  constructor(private alunoService: AlunoService, private activatedRoute: ActivatedRoute, private toastController:
    ToastController, private navController: NavController, private formBuilder:
      FormBuilder) {

    this.aluno = new Aluno();

    this.formGroup = this.formBuilder.group({
      'nome': [this.aluno.nome, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'email': [{
        value: this.aluno.email,
        disabled: true
      }],
      'senha': [this.aluno.senha, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'idade': [this.aluno.senha, Validators.compose([
        Validators.required,
        Validators.min(12)
      ])]
    });

    this.aluno = this.alunoService.alunoAutenticar();
    this.formGroup.get('nome')?.setValue(this.aluno.nome);
    this.formGroup.get('senha')?.setValue(this.aluno.senha);
    this.formGroup.get('email')?.setValue(this.aluno.email);
    this.formGroup.get('idade')?.setValue(this.aluno.idade);
  }

  ngOnInit() {
  }

  salvar() {
    this.aluno.nome = this.formGroup.value.nome;
    this.aluno.senha = this.formGroup.value.senha;
    this.aluno.idade = this.formGroup.value.idade;

    this.alunoService.salvar(this.aluno).then((json) => {
      this.aluno = <Aluno>(json);
      if (this.aluno) {
        this.exibirMensagem('Registro atualizado com sucesso!!!');
        this.navController.navigateBack('/dado');
        this.alunoService.salvarAlunoAutenticado(this.aluno);
      } else {
        this.exibirMensagem('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
      });
  };

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}