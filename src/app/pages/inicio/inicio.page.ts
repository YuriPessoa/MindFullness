import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public appPages = [

    { title: 'Tarefas', url: '/tarefa', icon: 'school', color: "warning" },
    { title: 'Diário', url: '/diario', icon: 'people-circle', color: "warning" },
    { title: 'Meus dados', url: '/dado', icon: 'accessibility', color: "warning" },
    { title: 'Calendário', url: '/calendario', icon: 'calendar', color: "warning" },
    { title: 'Sair', url: '/sair', icon: 'log-in', color: "warning" }
  ];

  constructor() { }

  ngOnInit() {
  }
}