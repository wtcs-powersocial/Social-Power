import { Component, OnInit } from '@angular/core';
import { DenunciaService } from '../denuncia.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DenunciaService]
})
export class HomeComponent implements OnInit {

  posts: any = null;

  constructor(private service: DenunciaService) { }

  ngOnInit() {
    this.service.getDenunciasAll().subscribe(
      res => {
        this.posts = res;
      },
      err => {
        alert('Caro usuário(a), infelizmente ocorreu inesperado.');
        console.log(err);
      }
    );
  }
}
