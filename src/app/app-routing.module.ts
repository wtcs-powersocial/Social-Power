import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NewLoginComponent } from './new-login/new-login.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { DenouceComponent } from './denouce/denouce.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'cadastro', component: NewLoginComponent},
  {path: 'principal', component: HomeComponent},
  {path: 'show', component: MapComponent},
  {path: 'nova-denuncia', component: DenouceComponent},
  {path: 'minhas-denuncias', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
