import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { HistoryComponent } from './history/history.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    DenouceComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MapComponent,
    NavbarComponent,
    NewLoginComponent,
    HistoryComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOJ2XdMlZGFwq3G-U3pJdA_v8Rui49YA8',
      libraries: ['places']
    }),
    WebcamModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
