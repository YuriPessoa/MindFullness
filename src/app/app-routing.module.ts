import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tarefa',
    loadChildren: () => import('./pages/tarefa/tarefa.module').then( m => m.TarefaPageModule)
  },
  {
    path: 'add-tarefa',
    loadChildren: () => import('./pages/add-tarefa/add-tarefa.module').then( m => m.AddTarefaPageModule)
  },
  {
    path: 'add-tarefa/:id',
    loadChildren: () => import('./pages/add-tarefa/add-tarefa.module').then( m => m.AddTarefaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule)
  },
  {
    path: 'diario',
    loadChildren: () => import('./pages/diario/diario.module').then( m => m.DiarioPageModule)
  },
  {
    path: 'diario/:id',
    loadChildren: () => import('./pages/diario/diario.module').then( m => m.DiarioPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'dado',
    loadChildren: () => import('./pages/dado/dado.module').then( m => m.DadoPageModule)
  },
  {
    path: 'sair',
    loadChildren: () => import('./pages/sair/sair.module').then( m => m.SairPageModule)
  },
  {
    path: 'cuidado',
    loadChildren: () => import('./pages/cuidado/cuidado.module').then( m => m.CuidadoPageModule)
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then( m => m.VideoPageModule)
  },
  {
    path: 'ajuda',
    loadChildren: () => import('./pages/ajuda/ajuda.module').then( m => m.AjudaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
