import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuidadoPage } from './cuidado.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuidadoPageRoutingModule {}
