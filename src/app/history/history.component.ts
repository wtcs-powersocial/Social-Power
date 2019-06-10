import { DenunciaService } from '../denuncia.service';
import { Component, OnInit } from '@angular/core';
import { DenunciaModel } from '../shared/denuncia.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  myDenouces: DenunciaModel[];

  constructor(private service: DenunciaService) { }

  ngOnInit() {
    this.service.getDenunciasByUser(2)
    .then((r: DenunciaModel[]) => this.myDenouces = r)
    .catch((r: any) => console.log(r));
  }

}
