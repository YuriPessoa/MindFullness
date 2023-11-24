import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  formGroup: FormGroup;

  constructor(private alunoService: AlunoService, private activedRoute: ActivatedRoute, private toastController:
    ToastController, private navController: NavController, private formBuilder:
      FormBuilder) {

    this.formGroup = this.formBuilder.group({
      'email': [, Validators.compose([
        Validators.email,
        Validators.required,
        Validators.minLength(5)
      ])],
      'senha': [, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])]
    })
  }

  ngOnInit() {
  }

  salvar() {
    let email = this.formGroup.value.email;
    let senha = this.formGroup.value.senha;

    this.alunoService.fazerLogin(email, senha).then((json) => {
      let aluno = <Aluno>(json);

      if (aluno === null) {
        this.exibirMensagem('Dados inválidos!!!');
      } else {
        this.exibirMensagem('Bem vindo ao sistema!');
        this.alunoService.salvarAlunoAutenticado(aluno);
        this.navController.navigateBack('/cuidado')
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
