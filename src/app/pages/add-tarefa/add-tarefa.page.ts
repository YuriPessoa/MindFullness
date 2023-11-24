import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { AlunoService } from 'src/app/services/aluno.service';
import { Aluno } from 'src/app/model/aluno';

@Component({
  selector: 'app-add-tarefa',
  templateUrl: './add-tarefa.page.html',
  styleUrls: ['./add-tarefa.page.scss'],
})
export class AddTarefaPage implements OnInit {
  tarefa: Tarefa;
  formGroup: FormGroup;

  constructor(private alunoService: AlunoService, private tarefaService: TarefaService, private activedRoute: ActivatedRoute, private toastController:
    ToastController, private navController: NavController, private formBuilder:
      FormBuilder) {

    this.tarefa = new Tarefa();

    this.formGroup = this.formBuilder.group({
      'descricao': [this.tarefa.descricao, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],
      'dataTermino': [, Validators.compose([
        Validators.required,
      ])],
      'situacao': [this.tarefa.situacao, Validators.compose([
        Validators.required,
      ])]
    })

    let id = this.activedRoute.snapshot.params['id'];
    if (id != null) {
      this.tarefaService.buscarPorId(id).then((json) => {
        this.tarefa = <Tarefa>(json);
        this.formGroup.get('descricao')?.setValue(this.tarefa.descricao);
        this.formGroup.get('dataTermino')?.setValue(this.tarefa.dataTermino);
        this.formGroup.get('situacao')?.setValue(this.tarefa.situacao);
      });
    }
  }

  ngOnInit() {
  }

  salvar() {
    let aluno: Aluno = this.alunoService.alunoAutenticar();

    console.log(aluno);

    this.tarefa.descricao = this.formGroup.value.descricao;
    this.tarefa.dataTermino = this.formGroup.value.dataTermino;
    this.tarefa.situacao = this.formGroup.value.situacao;
    this.tarefa.idAluno = aluno.idAluno;

    this.tarefaService.salvar(this.tarefa).then((json) => {
      this.tarefa = <Tarefa>(json);
      if (this.tarefa) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.navController.navigateBack('/tarefa');
      } else {
        this.exibirMensagem('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
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
