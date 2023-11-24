import { Component , OnInit } from '@angular/core';
import { Tarefa } from 'src/app/model/tarefa';
import { TarefaService } from 'src/app/services/tarefa.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.page.html',
  styleUrls: ['./tarefa.page.scss'],
})

export class TarefaPage implements OnInit {
  tarefas: Tarefa[];
  
  constructor(private alunoService: AlunoService, private loadingController: LoadingController, private tarefaService: TarefaService, private toastController: ToastController, private navController: NavController, private alertController: AlertController) {
    this.tarefas = [];
   }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();

    let aluno = this.alunoService.alunoAutenticar();

    await this.tarefaService.buscarPorIdAluno(aluno.idAluno)
      .then((json) => {
        this.tarefas = <Tarefa[]>(json);
      });

    this.fecharLoader();
  }

  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 500);
  }


  async excluir(tarefa: Tarefa){
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?', 
      message: tarefa.descricao, 
      buttons:[
        { 
          text: 'Cancelar'
        }, {
          text: 'Confirmar', 
          cssClass: 'danger',
          handler: () => {
            this.tarefaService.excluir(tarefa.idTarefa).then(() => {
              this.carregarLista();
              this.exibirMensagem('Registro excluído com sucesso!!!');
            }).catch(() => {
              this.exibirMensagem('Erro ao excluir o registro:');
            });
          }
        }  
      ]
    }); 
    await alert.present();
  }

  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
      message: texto, 
      duration: 1500
    }); 
    toast.present(); 
  }
}