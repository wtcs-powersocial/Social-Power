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

  public newUser: UserModel;

  constructor(private service: LoginService) { }

  ngOnInit() {
  }

  private insert(user: UserModel): void {
    this.service.insert(user);
    alert('Inserido com sucesso --> ' + this.service.getAll());
  }

  public alerta(): void {
    alert('Funciona');
  }

  public addUser(name: string, password: string, email: string, uf: string, city: string): void {
    this.newUser.name = name;
    this.newUser.email = email;
    this.newUser.password = password;
    this.newUser.city = city;
    this.newUser.uf = uf;

    this.insert(this.newUser);
  }

}

