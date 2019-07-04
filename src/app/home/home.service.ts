import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { urlApi } from './../shared/app.api';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  setInteration(post: any, info: any): Observable<any> {
    return this.http.put<any>(`${urlApi}/denouces/likes/${post}`, info);
  }

  getCountLike(post: any): number {
    if (post.curtidas) {
      let like = 0;
      post.curtidas.forEach(element => {
        if (element.like) {
          like++;
        }
      });
      return like;
    }
    return 0;
  }

  getCountDeslike(post: any): number {
    if (post.curtidas) {
      let deslike = 0;
      post.curtidas.forEach(element => {
        if (!element.like) {
          deslike++;
        }
      });
      return deslike;
    }
    return 0;
  }

  insertComment(post: any, comment: any): Observable<any> {
    return this.http.put<any>(`${urlApi}/denouces/comentarios/${post}`, comment);
  }
}
