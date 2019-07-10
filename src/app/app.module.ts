import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// instalados
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

// meus módulos
import { BasicModule } from './basic/basic.module';
import { DenunciasModule } from './denuncias/denuncias.module';
import { ModuleLoginModule } from './module-login/module-login.module';
import { ModuleNewDenunciaModule } from './module-new-denuncia/module-new-denuncia.module';
import { ModuleMapaModule } from './module-mapa/module-mapa.module';
// import { ModuleMenuModule } from './module-menu/module-menu.module';

import { LoginService } from './login.service';
import { DenunciaService } from './denuncia.service';
import { TokenInterceptorService } from './token-interceptor.service';
import { SentinelaGuard } from './sentinela.guard';



// meus componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { CoreModule } from 'truly-ui'; // CoreModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFontAwesomeModule,
    CoreModule.forRoot({theme: 'default'}),
    BasicModule,
    DenunciasModule,
    ModuleLoginModule,
    ModuleNewDenunciaModule,
    ModuleMapaModule
    // ModuleMenuModule
  ],
  providers: [SentinelaGuard, LoginService, DenunciaService, TokenInterceptorService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
