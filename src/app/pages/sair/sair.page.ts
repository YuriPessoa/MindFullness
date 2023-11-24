import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sair',
  templateUrl: './sair.page.html',
  styleUrls: ['./sair.page.scss'],
})
export class SairPage implements OnInit {

  constructor(private navController: NavController) {
    localStorage.setItem('alunoAutenticado', JSON.stringify(null));
    this.navController.navigateBack('/login');
  }

  ngOnInit() {
  }
}
