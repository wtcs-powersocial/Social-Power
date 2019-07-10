import { Component, OnInit } from '@angular/core';

import { HomeService } from '../home/home.service';
import { LoginService } from '../../login.service';
import { DenunciaService } from '../../denuncia.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  posts: any[];
  user: any = null;


  constructor(private service: DenunciaService, private login: LoginService, private home: HomeService) { }

  ngOnInit() {
    this.setUserHome();
    this.service.getDenunciasByUser(this.getUserId()).subscribe(
      res => {
        this.posts = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  private getUserId() {
    return this.login.getUserById();
  }

  getComentario(idPost: any): any {
    let comentario = <HTMLInputElement> document.getElementById(idPost);
    return comentario.value;
  }

  insertLikeOrDeslike(idPost: any, content: boolean) {
    const likeOrDeslike = {
      userId: this.user.id,
      userName: this.user.name,
      like: content
    };
    this.home.setInteration(idPost, likeOrDeslike).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => console.log(err)
    );
  }

  /**
   *
   * @param idPost representa o identificador único da postagem referente ao comentário
   */
  setComentario(idPost: any) {
    const content = this.getComentario(idPost);
    const comment = {
      userId: this.user.id,
      userName: this.user.name,
      msg: content
    };
    this.home.insertComment(idPost, comment).subscribe(
      res => {
        console.log(res);
        window.location.reload();
      },
      err => console.log(err)
    );
  }

  getLike(post: any): number {
    return this.home.getCountLike(post);
  }

  getDeslike(post: any): number {
    return this.home.getCountDeslike(post);
  }

  private setUserHome(): void {
    let dados = this.login.getUser();
    let dadoToUser = {
      name: dados.nameComplete,
      id:  dados._id
    }
    this.user = dadoToUser;
    dados = null;
    dadoToUser = null;
  }

}
