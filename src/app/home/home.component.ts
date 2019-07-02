import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { DenunciaModel } from '../shared/denuncia.model';
import { DenunciaService } from '../denuncia.service';

import * as sdkFirebase from 'firebase';
import { FirebaseModel } from './../shared/firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DenunciaService]
})
export class HomeComponent implements OnInit {

  posts: any = null;
  sdk: FirebaseModel;

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

  showAll(): void {
    console.log(this.posts);
  }
}
