import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiarioPageRoutingModule } from './diario-routing.module';

import { DiarioPage } from './diario.page';
import { RouterLink } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiarioPageRoutingModule,
    RouterLink, 
    ReactiveFormsModule
  ],
  declarations: [DiarioPage]
})
export class DiarioPageModule {}
