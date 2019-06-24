import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login/login.service';
import { UserModel } from '../shared/user.model';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css'],
  providers: [LoginService]
})
export class NewLoginComponent implements OnInit {

  constructor(private service: LoginService) {
  }

  ngOnInit() {
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
    try{
    this.service.insert(newUser).subscribe();
    } catch (error) {
      alert(error);
    }

  }

}

