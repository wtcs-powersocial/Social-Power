import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from '../shared/user.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public currentUser: UserModel;
  private status: boolean;

  constructor(private service: LoginService, private rota: Router) { }

  public image: string;

  ngOnInit() {
    this.image = '../../assets/login.png';
    this.status = false;
  }

  public login(email: string, senha: string): void {
    this.status = this.service.logar(email, senha);
    this.status ? this.rota.navigate(['principal']) : alert('Acesso negado!');
  }

}
