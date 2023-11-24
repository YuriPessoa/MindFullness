import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Aluno } from 'src/app/model/aluno';
import { Diario } from 'src/app/model/diario';
import { Humor } from 'src/app/model/humor';
import { AlunoService } from 'src/app/services/aluno.service';
import { DiarioService } from 'src/app/services/diario.service';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  diarios: Diario[];
  humorDiarios: Humor[];

  constructor(private navController: NavController, private loadingController: LoadingController, private diarioService: DiarioService, private alunoService: AlunoService) {
    this.diarios = [];
    this.humorDiarios = [];
  }

  ngOnInit() {
  }

  redirecionarParaDiarioAntigo(idDiario: number) {
    this.navController.navigateBack('/diario/' + idDiario)
  }

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();

    this.diarios = [];
    this.humorDiarios = [];

    let aluno: Aluno = this.alunoService.alunoAutenticar();

    await this.diarioService.buscarPorIdAluno(aluno.idAluno).then(async (json) => {
      this.diarios = <Diario[]>(json);

      for (let diario of this.diarios)
        await this.diarioService.buscarHumorPorIdDiario(diario.idDiario).then((json) => {
          let humor = <Humor>(json);

          if (humor !== null) {
            this.humorDiarios.push(humor);
          }
        });
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
}