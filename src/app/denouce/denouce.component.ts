import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http'; // navigate
import { Subject, Subscription} from "rxjs";

import { DenunciaModel } from './../shared/denuncia.model';
import { DenunciaService } from '../denuncia.service';
import { CategoryModel } from '../shared/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denouce',
  templateUrl: './denouce.component.html',
  styleUrls: ['./denouce.component.css'],
  providers: [DenunciaService]
})

export class DenouceComponent implements OnInit {

  inscricao: Subscription;
  newDenuncia: {}; // denuncia atual
  img_denuncia: File;
  categories: CategoryModel[];
  categorySelected: string;
  formData = new FormData();
  description: string; // descrição da denuncia
  // exibir mapa da cidade de floriano
  lat: number;
  lng: number;
  zoom: number;
  // dados da localização atual
  currentLat: number;
  currrentLng: number;
  // exibir esses dados em uma outra div?
  show: boolean;
  constructor(private service: DenunciaService, private rota: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.display();
    this.service.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    );
  }

  // insert de teste, no modo de produção receberá um objeto denuncia.
  insert(): void {
    try {
      this.formData.append('latitude', this.currentLat.toString());
      this.formData.append('longitude', this.currrentLng.toString());
      this.formData.append('author', 'teste');
      this.formData.append('descricao', this.description);
      this.formData.append('categoria', this.categorySelected);

      this.service.insert(this.formData).subscribe(
        res => {console.log(res),
          this.rota.navigate(['principal']);
        },
        err => console.log(err)
      );
    } catch (error) {
      alert('Caro usuário(a), infelizmente ocorreu um erro inesperado.');
      console.log(error);
    }
  }

  uploadImage(event) {
    if (event.target.files[0]) {
      this.img_denuncia = event.target.files[0];
      this.formData.append('img_denuncia', this.img_denuncia, this.img_denuncia.name);
    } else {
      alert('Imagem não selecionada.');
    }
  }

  getDescription(desc: string): void {
    this.description = desc;
  }

  getCategory(option: string): void {
    this.categorySelected = option;
  }

  alterShow(): void {
    this.show = !this.show;
  }

  showPosition(): void {
    this.getCurrentPosition();
    this.show = true;
  }

  private display(): void {
    this.show = false;
  }

  private getCurrentPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.currrentLng = pos.coords.longitude;
        this.currentLat = pos.coords.latitude;
      });
    }
  }
}
