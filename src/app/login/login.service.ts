import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserModel } from '../shared/user.model';
import { urlApi } from '../shared/app.api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public myUsers: UserModel[];

  constructor(private serviceHttp: HttpClient) {
    this.getAll().then((r: UserModel[]) => this.myUsers = r ).catch((r: any) => console.log(r));
   }

  public getAll(): Promise<UserModel[]> {
    console.log(urlApi + '/users');
    return this.serviceHttp.get(`${urlApi}/users`).toPromise()
    .then((response: any) => response)
    .catch((response: any) => response);
  }

  public logar(email: string, senha: string): boolean {
    console.log(this.myUsers);
    let i;
    for (i = 0; i < this.myUsers.length; i++) {
      if (this.myUsers[i].email === email) {
        if (this.myUsers[i].password === senha) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  insert(newUser: UserModel): Observable<UserModel> {
    return this.serviceHttp.post<UserModel>(`${urlApi}/users`, newUser, this.httpOptions);
  }

  criar(user: any) {
    return this.serviceHttp.post(`${urlApi}/users`, user);
  }

  insertForm(newUser: FormData): Observable<FormData> {
    return this.serviceHttp.post<FormData>(`${urlApi}/users`, newUser, this.httpOptions);
  }

  private init(): void {
  }
}
