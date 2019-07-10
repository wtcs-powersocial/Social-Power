import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  equipe: string;
  foudantionYear: number;
  constructor() { }

  ngOnInit() {
    this.equipe = 'AKR Soluções Tecnlógicas';
    this.foudantionYear = 2019;
  }

}
