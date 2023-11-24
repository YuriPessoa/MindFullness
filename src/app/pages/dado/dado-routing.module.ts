import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DadoPage } from './dado.page';

const routes: Routes = [
  {
    path: '',
    component: DadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DadoPageRoutingModule {}
