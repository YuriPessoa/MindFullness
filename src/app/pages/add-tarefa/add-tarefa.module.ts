import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTarefaPageRoutingModule } from './add-tarefa-routing.module';

import { AddTarefaPage } from './add-tarefa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddTarefaPageRoutingModule
  ],
  declarations: [AddTarefaPage]
})
export class AddTarefaPageModule {}
