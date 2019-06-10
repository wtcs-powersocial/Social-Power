import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NewLoginComponent } from './new-login/new-login.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { DenouceComponent } from './denouce/denouce.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'new-user', component: NewLoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'mapa', component: MapComponent},
  {path: 'denouce', component: DenouceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
