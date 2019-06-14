import { Component, OnInit } from '@angular/core';

import { Localization } from '../shared/localization.model';
import { DenunciaService } from '../denuncia.service';
import { DenunciaModel } from '../shared/denuncia.model';
import { Observable} from "rxjs/Observable";
import { Subject } from 'rxjs';

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

    console.log(this.denuncias);
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
