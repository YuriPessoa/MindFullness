import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuidadoPageRoutingModule } from './cuidado-routing.module';

import { CuidadoPage } from './cuidado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuidadoPageRoutingModule
  ],
  declarations: [CuidadoPage]
})
export class CuidadoPageModule {}
