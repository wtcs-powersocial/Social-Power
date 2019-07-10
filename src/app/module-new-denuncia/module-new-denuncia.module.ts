import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// módulos de terceiros

// meus módulos
import { ModuleMenuModule } from './../module-menu/module-menu.module';
// meus componentes
import { DenouceComponent } from './denouce/denouce.component';

@NgModule({
  declarations: [DenouceComponent],
  imports: [
    CommonModule,
    RouterModule,
    ModuleMenuModule
  ],
  exports: [DenouceComponent]
})
export class ModuleNewDenunciaModule { }
