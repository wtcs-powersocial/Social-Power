import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';

import { DenunciaModel } from './shared/denuncia.model';
import { urlApi } from './shared/app.api';
import { CategoryModel } from './shared/category.model';
import { UserModel } from './shared/user.model';
import { storage } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {

  denuncias: DenunciaModel[];
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpService: HttpClient) {
   }

   // consume a nossa API fake para retornar todas as ofertas
   public getDenunciasAll(): Observable<any[]> {
    return this.httpService.get<any[]>(`${urlApi}/denouces`);
  }

  public getDenunciasByUser(id: any): Observable<any[]> {
    return this.httpService.get<any[]>(`${urlApi}/denouces/user/${id}`);
  }

  public getCategories(): any {
    return this.httpService.get<any>(`${urlApi}/categories`);
  }

  public insert(newDenouce: FormData): any {
    return this.httpService.post<any>(`${urlApi}/denouces`, newDenouce);
  }

  public getUrlImageFB(search: any) {
    return storage().ref().child(search).getDownloadURL();
  }
}
