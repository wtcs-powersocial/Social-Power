import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoginService } from '../login/login.service';
import { UserModel } from '../shared/user.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css'],
  providers: [LoginService]
})
export class NewLoginComponent implements OnInit, OnDestroy {

  inscrito: Subscription;

  constructor(private service: LoginService, private roteador: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.inscrito.unsubscribe();
  }

  public myInsert(): void {
    // this.service.insert(this.newUser).subscribe();
  }

  public addUser(nameCompleto: string, emailUser: string, nameUser: string, pswUser: string, cpf: string, dataNasc: string): void {
    // nameCompleto.value, emailUser.value, nameUser.value, pswUser.value, emailUser.value, cpf.value, dataNasc.values
    dataNasc = '01/11/1998';
    let newUser = new UserModel(nameCompleto, emailUser, nameUser, pswUser, cpf, dataNasc);
    alert(newUser);
    console.log(nameCompleto);
    try {
    this.inscrito = this.service.insert(newUser).subscribe();
    this.roteador.navigate(['']);
    } catch (error) {
      alert(error);
    }

  }

}

