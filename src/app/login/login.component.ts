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

  constructor(private service: LoginService, private rota: Router) { }

  public image: string;
  public userSystem: {};

  ngOnInit() {
    this.image = '../../assets/login.png';
  }

  public login(userEmail: string, userPassword: string): void {
    const user = { email: userEmail, password: userPassword };
    this.service.login(user).subscribe(
      res => { localStorage.setItem('token', res.token); this.rota.navigate(['principal']); },
      err => { console.log(err); alert(err.error.error); }
    );
  }

}
