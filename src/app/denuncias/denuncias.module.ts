
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'truly-ui';

import { ModuleMenuModule } from './../module-menu/module-menu.module';

import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';

const components = [HomeComponent, HistoryComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ModuleMenuModule
  ],
  exports: components
})
export class DenunciasModule { }
