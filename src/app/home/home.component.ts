
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

  posts: DenunciaModel[];

  constructor(private service: DenunciaService) { }

  ngOnInit() {
    console.log('começou');
    return this.service.getDenunciasAll()
    .then((response: DenunciaModel[]) => this.posts = response)
    .catch((response: any) => console.log(response));
  }

  showAll(): void {
    console.log(this.posts);
  }
}
