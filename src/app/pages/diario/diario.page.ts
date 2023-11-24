import { Component, OnInit } from '@angular/core';
import { Diario } from 'src/app/model/diario';
import { ToastController, NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno } from 'src/app/model/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { Humor } from 'src/app/model/humor';
import { Descricao } from 'src/app/model/descricao';
import { DescricaoService } from 'src/app/services/descricao.service';
import { DiarioService } from 'src/app/services/diario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.page.html',
  styleUrls: ['./diario.page.scss'],
})

export class DiarioPage implements OnInit {
  descricaos: Descricao[];
  formGroup: FormGroup;
  diario: Diario;
  humor: Humor;
  descricaoAtual: Descricao;
  isDiarioAntigo: boolean;

  constructor(private activatedRoute: ActivatedRoute, private alertController: AlertController, private alunoService: AlunoService, private descricaoService: DescricaoService, private diarioService: DiarioService, private toastController: ToastController, private navController: NavController, private formBuilder: FormBuilder) {
    this.descricaos = [];
    this.diario = new Diario();
    this.humor = new Humor();
    this.descricaoAtual = new Descricao();
    this.isDiarioAntigo = false;

    this.formGroup = this.formBuilder.group({
      'descricao': [this.descricaoAtual.descricao, Validators.compose([Validators.minLength(5)])],
    });

    let data = new Date().toLocaleDateString();
    let aluno: Aluno = this.alunoService.alunoAutenticar();

    this.diarioService.buscarPorIdAlunoData(data, aluno.idAluno).then((json) => {
      this.diario = <Diario>(json);

      if (this.diario === null) {
        this.diario = new Diario();

        this.diario.dataDiario = data;
        this.diario.idAluno = aluno.idAluno;

        this.diarioService.salvar(this.diario).then((json) => {
          this.diario = <Diario>(json);
          this.descricaoAtual.idDiario = this.diario.idDiario;
        })
      }

      let id = this.activatedRoute.snapshot.params['id'];
      if (id != null) {
        this.diarioService.buscarPorId(id).then((json) => {
          this.diario = <Diario>(json);

          if (this.diario.dataDiario !== data){
            this.isDiarioAntigo = true;
          }

          this.diarioService.buscarHumorPorIdDiario(this.diario.idDiario).then((json) => {
            let resposta = <Humor>(json);;
            if (resposta !== null) {
              this.humor = <Humor>(json);
            }
          });
        });
      } else {
        this.descricaoAtual.idDiario = this.diario.idDiario;

        this.diarioService.buscarHumorPorIdDiario(this.diario.idDiario).then((json) => {
          let resposta = <Humor>(json);;
          if (resposta !== null) {
            this.humor = <Humor>(json);

            this.exibirMensagemP('Lembre-se: você já registrou sua emoção hoje como ' + this.humor.tipoHumor + ". ;)");
          } else {
            this.exibirMensagemP('Registre a sua emoção e os seus pensamentos hoje!');
          }
        });
      }
    });
  }

  editar(descricao: Descricao) {
    this.descricaoAtual = descricao;
    this.formGroup.get('descricao')?.setValue(this.descricaoAtual.descricao);
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.descricaoService.listarPorIdDiario(this.diario.idDiario).then((json) => {
      this.descricaos = <Descricao[]>(json);
    });
  }

  salvar() {
    this.descricaoAtual.descricao = this.formGroup.value.descricao;
    this.descricaoAtual.idDiario = this.diario.idDiario;

    this.descricaoService.salvar(this.descricaoAtual).then((json) => {
      let resposta = <Descricao>(json);
      if (resposta) {
        this.exibirMensagem('Registro salvo com sucesso!!!');
        this.formGroup.get('descricao')?.setValue("");
        this.ionViewWillEnter();
      } else {
        this.exibirMensagem('Erro ao salvar o registro!')
      }
    })
      .catch((error) => {
        this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
      });
  }


  registrarEmocao(emocao: string) {
    const dataAtual = new Date().toLocaleDateString();

    if (this.humor.dataHumorDiario === dataAtual) {
      // Exibe uma mensagem informando que o usuário já registrou uma emoção hoje
      this.exibirMensagem('Você já registrou sua emoção hoje.');
    } else {
      // Registra a data para a emoção clicada
      this.humor.dataHumorDiario = dataAtual;
      this.humor.tipoHumor = emocao;
      this.humor.idDiario = this.diario.idDiario;

      if (emocao === "pessimo") {
        this.humor.icone = "assets/triste.jpg";
      } else if (emocao === "ruim") {
        this.humor.icone = "assets/feliz.jpg";
      } else if (emocao === "neutro") {
        this.humor.icone = "assets/neutro.jpg";
      } else if (emocao === "bom") {
        this.humor.icone = "assets/contente.jpg";
      } else {
        this.humor.icone = "assets/alegre.jpg";
      }

      this.diarioService.salvarHumor(this.humor).then((json) => {
        this.humor = <Humor>(json);
        if (this.humor) {
          this.exibirMensagemP("A emoção " + emocao + " foi clicada em " + dataAtual + ".");
        } else {
          this.exibirMensagem('Erro ao salvar o registro!')
        }
      })
        .catch((error) => {
          this.exibirMensagem('Erro ao salvar o registro! Erro: ' + error['mensage']);
        })
    }
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500,
    });
    toast.present();
  }


  private exibirMensagemP(mensagem: string) {
    this.toastController
      .create({
        message: mensagem,
        duration: 2000, // Duração da mensagem em milissegundos
        position: 'bottom', // Posição da mensagem (top, bottom, middle)
      })
      .then((toast) => {
        toast.present();
      });
  }

  async excluir(descricao: Descricao) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: descricao.descricao,
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.descricaoService.excluir(descricao.idDescricao).then(() => {
              this.ionViewWillEnter();
              this.exibirMensagem('Registro excluído com sucesso!');
            }).catch(() => {
              this.exibirMensagem('Erro ao excluir o registro:');
            });
          }
        }
      ]
    })
    await alert.present();
  }
}