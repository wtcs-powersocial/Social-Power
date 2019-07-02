import { Component, OnInit } from '@angular/core';

import { DenunciaService } from '../denuncia.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    // localização inicial do mapa
    latitude = -6.7827932;
    longitude = -43.0266088;
    zoom = 14;
    denuncias: any;
    // localização do usuário
    myLatitude: number;
    myLongitude: number;
    myZoom: number;

  constructor(private service: DenunciaService) { }

  ngOnInit() {
    this.service.getDenunciasAll().subscribe(
      res => {
        this.denuncias = res;
        console.log(res);
      },
      err => {
        alert('Erro ao carregar mapa de denúncias.');
        console.log(err);
      });
  }

  getCurrentPositionUser(): void {
    if (navigator) {
      navigator.geolocation.getCurrentPosition( pos => {
        this.myLatitude = pos.coords.latitude;
        this.myLongitude = pos.coords.longitude;
      });
    }
  }

}
