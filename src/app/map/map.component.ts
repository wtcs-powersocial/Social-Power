import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';

import { Localization } from '../shared/localization.model';
import { DenunciaService } from '../denuncia.service';
import { DenunciaModel } from '../shared/denuncia.model';
import { Observable} from "rxjs/observable";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    // capturar imagem
    @ViewChild("video") public video: ElementRef;
    @ViewChild("canvas") public canvas: ElementRef;
    seconds: number;
    trigger: Subject<void> = new Subject<void>();
    webcamImage: WebcamImage = null;
    // localização inicial do mapa
    latitude = -6.7827932;
    longitude = -43.0266088;
    zoom = 14;
    denuncias: DenunciaModel[];
    // localização do usuário
    myLatitude: number;
    myLongitude: number;
    myZoom: number;

  constructor(private service: DenunciaService) { }

  ngOnInit() {
    this.service.getDenunciasAll()
    .then((response: DenunciaModel[]) => this.denuncias = response)
    .catch((response: any) => console.log(response));
  }

  getCurrentPositionUser(): void {
    if (navigator) {
      navigator.geolocation.getCurrentPosition( pos => {
        this.myLatitude = pos.coords.latitude;
        this.myLongitude = pos.coords.longitude;
      });
    }
  }

  // capture image
  public triggerSnapshot(): void {
    this.seconds = 3;
    setTimeout(() => {
      this.seconds = 2;
     setTimeout(() => {
       this.seconds = 1
       setTimeout(() => {
         this.trigger.next();
         this.seconds = null;
       },1000)
     },1000)
    },1000)
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
