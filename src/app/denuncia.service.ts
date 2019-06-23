import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';

import { DenunciaModel } from './shared/denuncia.model';
import { urlApi } from './shared/app.api';
import { CategoryModel } from './shared/category.model';

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {

  denuncias: DenunciaModel[];
  constructor(private httpService: HttpClient) {
   }

   // consume a nossa API fake para retornar todas as ofertas
   public getDenunciasAll(): Promise<DenunciaModel[]> {
    return this.httpService.get(`${urlApi}/denuncias`)
    .toPromise()
    .then((response: any) => {
      console.log(response);
      return response;
    })
    .catch((response: any) => response);
  }

  public getDenunciasByUser(id: number): Promise<DenunciaModel[]> {
    return this.httpService.get(`${urlApi}/denuncias?autor.idUser=${id}`).toPromise()
    .then((r: any) => r)
    .catch((r: any) => r);
  }

  public getCategories(): Promise<CategoryModel[]> {
    return this.httpService.get(`${urlApi}/categories`).toPromise()
    .then((r: any) => r)
    .catch((r: any) => r);
  }
}
