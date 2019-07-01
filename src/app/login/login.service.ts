import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { urlApi } from '../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private serviceHttp: HttpClient) {
   }

  public login(user: any): Observable<any> {
    return this.serviceHttp.post<any>(`${urlApi}/login`, user);
  }

  public register(files: FormData): Observable<any> {
    return this.serviceHttp.post<any>(`${urlApi}/register`, files);
  }

}
