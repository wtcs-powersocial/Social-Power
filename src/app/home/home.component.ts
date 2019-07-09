import { Component, OnInit } from '@angular/core';
import { DenunciaService } from '../denuncia.service';
import { LoginService } from './../login/login.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DenunciaService, HomeService]
})
export class HomeComponent implements OnInit {

  posts: any = null;
  user: any = null;
  curtidas: Array<boolean>;

  constructor(private service: DenunciaService,
    private login: LoginService,
    private home: HomeService) { }

  ngOnInit() {
    this.setUserHome();
    this.service.getDenunciasAll().subscribe(
      res => {
        this.posts = res;
        for (let i = 0; i < this.posts.lenght; i++) {
          this.curtidas[i] = false;
          this.posts._id.curtida = this.curtidas[i];
          // console.log(this.posts)
        }
      },
      err => {
        alert('Caro usuário(a), infelizmente ocorreu inesperado.');
        console.log(err);
      }
    );
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
  /**
   * Captura comentário
   */
  getComentario(idPost: any): any {
    let comentario = <HTMLInputElement> document.getElementById(idPost);
    return comentario.value;
  }

  getLike(post: any): number {
    return this.home.getCountLike(post);
  }

  getDeslike(post: any): number {
    return this.home.getCountDeslike(post);
  }

  show(id: any): void {
    alert(this.getComentario(id));
  }

  /**
   * Captura e seta os dados de id e name do user logado
   */
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
