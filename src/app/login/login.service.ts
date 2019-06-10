import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserModel } from '../shared/user.model';
import { urlApi } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public myUsers: UserModel[];

  constructor(private serviceHttp: HttpClient) {
    this.getAll().then((r: UserModel[]) => this.myUsers = r ).catch((r: any) => console.log(r));
   }

  public getAll(): Promise<UserModel[]> {
    return this.serviceHttp.get(`${urlApi}/users`).toPromise()
    .then((response: any) => response)
    .catch((response: any) => response);
  }

  public logar(email: string, senha: string): boolean {
    let i;
    for(i = 0; i < this.myUsers.length; i++) {
      if (this.myUsers[i].email == email){
        if (this.myUsers[i].password == senha) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  insert(newUser: UserModel): void {
    this.myUsers.push(newUser);
  }

  private init(): void {
  }
}
