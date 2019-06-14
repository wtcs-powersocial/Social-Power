import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {HttpClient} from '@angular/common/http'; // navigate
import { Subject} from "rxjs";
import { Observable} from "rxjs/Observable";
import {WebcamImage} from 'ngx-webcam';

import { DenunciaModel } from './../shared/denuncia.model';
import { DenunciaService } from '../denuncia.service';
import { CategoryModel } from '../shared/category.model';
import { Router } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-denouce',
  templateUrl: './denouce.component.html',
  styleUrls: ['./denouce.component.css'],
  providers: [DenunciaService]
})

export class DenouceComponent implements OnInit {

  @ViewChild("video") public video: ElementRef;
  @ViewChild("canvas") public canvas: ElementRef;
  public captures: Array<any>;

  myDenuncias: DenunciaModel[]; // conjunto de denuncias
  newDenuncia: DenunciaModel; // denuncia atual
  categories: CategoryModel[];
  showMap: boolean; // exibir mapa
  // exibir mapa da cidade de floriano
  lat: number;
  lng: number;
  zoom: number;
  // dados da localização atual
  currentLat: number;
  currrentLng: number;
  // exibir esses dados em uma outra div?
  show: boolean;
  constructor(private service: DenunciaService, private rota: Router) {
    this.captures = [];
     // só para testes
    this.newDenuncia = {
      categoria: 'Energia',
      descricao: 'sahfs rooyo ngfjnj jsdfsdf rejterjt dnfbns wefy rgnrj',
      imagem: null,
      id: 4,
      autor: {
        "name": "Romario Coelho Oliveira",
        "idUser": 1,
        "email": "rco@email.com",
        "password": "123456",
        "uf": "PI",
        "city": "Floriano",
        "icon": null
      },
      localizacao: {latitude: null, longitude: null},
      status: true
    };
  }

  ngOnInit() {
    this.positionCity();
    this.setDenuncias();
    this.display();
  }


  save(): void {
    this.rota.navigate(['/minhas-denuncias']);
  }

  private positionCity(): void {
    this.lat = -6.7827932;
    this.lng = -43.0266088;
    this.zoom = 15;
    this.service.getCategories()
    .then((r: CategoryModel[]) => this.categories = r)
    .catch((r: any) => console.log(r));
  }

  private setDenuncias(): void {
    this.service.getDenunciasAll()
    .then((r: DenunciaModel[]) => this.myDenuncias = r)
    .catch((r: any) => console.log(r));
  }

  private display(): void {
    this.show = false;
    this.showMap = false;
  }

  alterShow(): void {
    this.show = !this.show;
  }

  alterShowMap(): void {
    this.showMap = !this.showMap;
    console.log('Pontos: ' + this.myDenuncias);
  }

  showPosition(): void {
    this.getCurrentPosition();
    this.show = true;
  }

  private getCurrentPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.currrentLng = pos.coords.longitude;
        this.currentLat = pos.coords.latitude;
      });
    }
  }

  // insert de teste, no modo de produção receberá um objeto denuncia.
  insert(lat: number, lon: number): void {
    this.newDenuncia.localizacao.longitude = lat;
    this.newDenuncia.localizacao.longitude = lon;
    this.myDenuncias.push(this.newDenuncia);
    this.alterShowMap();
  }

  // capture image
  public seconds: number;
  private trigger: Subject<void> = new Subject<void>();

  // latest snapshot
  public webcamImage: WebcamImage = null;

  public triggerSnapshot(): void {
    this.seconds = 3;
    setTimeout(() => {
      this.seconds = 2;
     setTimeout(() => {
       this.seconds = 1
       setTimeout(() => {
         this.trigger.next();
         this.seconds = null;
       },2000)
     },2000)
    },2000)
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
