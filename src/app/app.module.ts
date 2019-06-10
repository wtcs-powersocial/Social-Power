import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DenouceComponent } from './denouce/denouce.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewLoginComponent } from './new-login/new-login.component';

@NgModule({
  declarations: [
    AppComponent,
    DenouceComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MapComponent,
    NavbarComponent,
    NewLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
