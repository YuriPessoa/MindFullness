import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DadoPageRoutingModule } from './dado-routing.module';

import { DadoPage } from './dado.page';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DadoPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [DadoPage]
})
export class DadoPageModule {}
