
import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { DenunciaModel } from '../shared/denuncia.model';
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
        console.log(res);
      },
      err => {
        alert('Caro usuário(a), infelizmente ocorreu inesperado.');
        console.log(err);
      }
    );
  }

  showAll(): void {
    console.log(this.posts);
  }
}
