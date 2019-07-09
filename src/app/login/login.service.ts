import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urlApi } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private serviceHttp: HttpClient, private roteador: Router) {
   }

  public login(user: any): Observable<any> {
    return this.serviceHttp.post<any>(`${urlApi}/login`, user);
  }

  public register(files: FormData): Observable<any> {
    return this.serviceHttp.post<any>(`${urlApi}/register`, files);
  }

  public logged() {
    return !!localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem( 'user');
    this.roteador.navigate(['']);
  }

  public getToken() {
    return localStorage.getItem('token');
  }
  public getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  public getUserById() {
    const dados = this.getUser();
    return dados._id;
  }

}
