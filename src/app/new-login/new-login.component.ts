import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { LoginService } from '../login/login.service';
import { UserModel } from '../shared/user.model';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css'],
  providers: [LoginService]
})
export class NewLoginComponent implements OnInit, OnDestroy {

  inscrito: Subscription;
  img: any;
  usuario: any;

  constructor(private service: LoginService, private roteador: Router) {
  }

  ngOnInit() {
    this.usuario = {};
  }

  ngOnDestroy() {
    this.inscrito.unsubscribe();
  }

  criar(frm: FormGroup) {
    console.log(this.usuario);
    this.service.criar(this.usuario).subscribe(resposta => {
      console.log(resposta);

      frm.reset();
    });
  }

  public myInsert(): void {
    // this.service.insert(this.newUser).subscribe();
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.usuario.icon = event.target.files[0];
      // const formData = new FormData();
      console.log(this.usuario.icon);
    } else {
      console.log('Nenhum arquivo foi selecionado.');
    }
  }

  public addUser(nameCompleto: string, emailUser: string, nameUser: string, pswUser: string, cpf: string, dataNasc: string): void {
    // nameCompleto.value, emailUser.value, nameUser.value, pswUser.value, emailUser.value, cpf.value, dataNasc.values
    const formData = new FormData();
    dataNasc = '01/11/1998';
    formData.append('arquivo', this.img);
    formData.append('nameComplete', nameCompleto);
    formData.append('email', emailUser);
    formData.append('password', pswUser);
    formData.append('cpf', cpf);
    formData.append('dataNasc', dataNasc);
    const newUser = new UserModel(nameCompleto, emailUser, nameUser, pswUser, cpf, dataNasc, this.img);
    console.log(newUser);
    try {
    this.inscrito = this.service.insert(newUser).subscribe();
    this.roteador.navigate(['']);
    } catch (error) {
      alert(error);
    }

  }

}

