import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// instalados
import { AgmCoreModule } from '@agm/core';
import {WebcamModule} from 'ngx-webcam';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// meus componentes
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
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHW2OC0FXfUD-BiEGOwHBM8VaNDizzXk0',
      libraries: ['places']
    }),
    WebcamModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
