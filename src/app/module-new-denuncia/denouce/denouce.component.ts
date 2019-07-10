
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; // navigate
import { Subscription, Observable} from "rxjs";
import { async } from '@angular/core/testing';

import { LoginService } from '../../login.service';
import { DenunciaService } from '../../denuncia.service';
import { CategoryModel } from '../../shared/category.model';
import { Router } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { storage } from 'firebase';

@Component({
  selector: 'app-denouce',
  templateUrl: './denouce.component.html',
  styleUrls: ['./denouce.component.css'],
})

export class DenouceComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;
  caminhoImagem: string;
  ref: AngularFireStorageReference;
  trava: boolean;
  img_denuncia: File;

  // task: AngularFireUploadTask;
  urlFirebase: any;


  inscricao: Subscription;
  newDenuncia: {}; // denuncia atual

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
  user: any = null;
  constructor(
    private service: DenunciaService,
    private rota: Router,
    private http: HttpClient,
    private afStorage: AngularFireStorage,
    private serviceLogin: LoginService
  ) {
  }

  ngOnInit() {
    this.trava = false;
    this.display();
    this.service.getCategories().subscribe(
      res => this.categories = res,
      err => {
        console.log(err);
        alert('Erro ao carregar categorias.');
        this.rota.navigate(['principal']);
      }
    );

    this.user = this.serviceLogin.getUser();
    console.log(this.user);
  }

  // insert de teste, no modo de produção receberá um objeto denuncia.
  insert(): void {
    alert(this.caminhoImagem);
    if (!this.trava) {
      this.trava = true;
      this.setUpload();
     }

    if (this.caminhoImagem) {
      try {
        const dadosUser = {
          id: this.user._id,
          name: this.user.nameComplete
        };
        // inserir
        this.formData.append('imagem', this.caminhoImagem);
        this.formData.append('latitude', this.currentLat.toString());
        this.formData.append('longitude', this.currrentLng.toString());
        this.formData.append('autor', JSON.stringify(dadosUser));
        this.formData.append('descricao', this.description);
        this.formData.append('categoria', this.categorySelected);

        this.service.insert(this.formData).subscribe(
          res => {
            alert('ok...');
            console.log(res); this.rota.navigate(['principal'] );
          },
          err => console.log(err)
        );
      } catch (error) {
        console.log(error);
        alert('Erro: Dados do usuário');

      }

  } else { alert('Aguardando firebase store'); }
}


   upload(event) {
    this.complete = false;
    this.img_denuncia = event.target.files[0];
  }

  async setUpload() {
    const nameImgFirebase = Date.now() + this.img_denuncia.name;
    const path = `denouces/${nameImgFirebase}`;
    const fileRef = this.afStorage.ref(path.replace(/\s/g, ''));
    this.task = this.afStorage.upload(path.replace(/\s/g, ''), this.img_denuncia);
    await this.task.then( async up => {
        await fileRef.getDownloadURL().subscribe(url => {
        this.complete = true;
        this.caminhoImagem = url;

      });
    });
    this.uploadPercent = this.task.percentageChanges();
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
