import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; // navigate
import { Subscription, Observable, from} from "rxjs";
import { async } from '@angular/core/testing';

import { DenunciaService } from '../denuncia.service';
import { CategoryModel } from '../shared/category.model';
import { Router } from '@angular/router';

import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { storage } from 'firebase';

@Component({
  selector: 'app-denouce',
  templateUrl: './denouce.component.html',
  styleUrls: ['./denouce.component.css'],
  providers: [DenunciaService]
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
      res => {
        this.categories = res;
        /* this.sdk = new FirebaseModel();
        sdkFirebase.initializeApp(this.sdk); */
      },
      err => console.log(err)
    );

    this.user = this.serviceLogin.getUser();
    console.log(this.user);
  }


  public async uploadFirebase(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.urlFirebase = await this.ref.getDownloadURL()._subscribe;
    this.task = this.ref.put(event.target.files[0]);
    //  url => this.urlFirebase = url
    // ).catch(err => console.log(err));
    // this.uploadProgress = this.task.percentageChanges();
    console.log(this.ref);
    await this.task.then(
      (res) => console.log(res))
      .catch((err) => console.log(err));

    console.log('URL:');
    console.log(this.urlFirebase);
    // this.ref.child('denuncias/' + id)
    /*
    this.ref = this.afStorage.ref(id);
    this.ref.put(event.target.files[0]);
    // storage().ref().child(`denuncias/1562095338340mean1.png`).getDownloadURL()
    this.afStorage.storage.ref().child(`denuncias/${id}`).getDownloadURL()
    .then((url: string) => this.urlFirebase = url)
    .catch((err: any) => console.log(err));
    let urlImg: any;
    const nameImg = Date.now() + this.img_denuncia.name;
    console.log('Name: ' + nameImg);
    */
  }
  // insert de teste, no modo de produção receberá um objeto denuncia.
  insert(): void {
    // this.setUpload();
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
          res => { console.log(res); this.rota.navigate(['principal'] );
          },
          err => console.log(err)
        );
      } catch (error) {
        console.log('Erro: Dados do usuário');
        console.log(error);
      }

  } else { console.log('Aguardando forebase store'); }
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
