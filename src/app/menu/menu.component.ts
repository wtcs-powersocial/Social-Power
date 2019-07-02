import { LoginService } from './../login/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private rota: Router, private service: LoginService) { }

  ngOnInit() {
  }

  public logout() {
    this.service.logout();
  }

}
