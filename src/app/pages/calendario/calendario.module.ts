import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    RouterLink
  ],
  declarations: [CalendarioPage]
})
export class CalendarioPageModule { }
