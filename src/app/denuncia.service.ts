import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';

import { DenunciaModel } from './shared/denuncia.model';
import { urlApi } from './shared/app.api';
import { CategoryModel } from './shared/category.model';
import { UserModel } from './shared/user.model';

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
   public getDenunciasAll(): Promise<DenunciaModel[]> {
    return this.httpService.get(`${urlApi}/denouces`)
    .toPromise()
    .then((response: any) => {
      console.log(response);
      return response;
    })
    .catch((response: any) => response);
  }

  public getDenunciasByUser(id: number): Promise<DenunciaModel[]> {
    return this.httpService.get(`${urlApi}/denuncias/${id}`).toPromise()
    .then((r: any) => r)
    .catch((r: any) => r);
  }

  public getCategories(): any {
    return this.httpService.get<any>(`${urlApi}/categories`);
  }

  public insert(newDenouce: FormData): any {
    return this.httpService.post<any>(`${urlApi}/denouces`, newDenouce);
  }
}
