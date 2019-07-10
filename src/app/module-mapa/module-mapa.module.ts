import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModuleMenuModule } from './../module-menu/module-menu.module';

import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOJ2XdMlZGFwq3G-U3pJdA_v8Rui49YA8',
      libraries: ['places']
    }),
    ModuleMenuModule
  ],
  exports: [MapComponent]
})
export class ModuleMapaModule { }
