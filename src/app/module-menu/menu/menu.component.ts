import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogado: any = null;
  constructor(private rota: Router, private service: LoginService) { }

  ngOnInit() {
    this.userLogado = this.service.getUser();
  }

  public logout() {
    this.service.logout();
  }

}
