import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginService } from '../login.service';
import { LoginComponent } from './login/login.component';
import { NewLoginComponent } from './new-login/new-login.component';


const components = [LoginComponent, NewLoginComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [LoginService],
  exports: components
})
export class ModuleLoginModule { }
