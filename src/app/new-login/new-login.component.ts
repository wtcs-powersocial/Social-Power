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
export class NewLoginComponent implements OnInit {

  inscrito: Subscription;
  img: File;
  usuario: any;
  formData = new FormData();
  // files: Set<File>;

  constructor(private service: LoginService, private roteador: Router) {
  }

  ngOnInit() {
    this.usuario = {};
  }

/*
  criar(frm: FormGroup) {
    console.log(this.usuario);
    this.service.insert(this.usuario).subscribe(resposta => {
      console.log(resposta);

      this.roteador.navigate(['']);
    });
  }
*/

  public myInsert(): void {
    // this.service.insert(this.newUser).subscribe();
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.img = event.target.files[0];
      // const formData = new FormData();
      // this.files.add(this.usuario.icon);
      console.log(this.img);
    } else {
      console.log('Nenhum arquivo foi selecionado.');
    }
  }

  /*
  private save() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files).subscribe(
        res => {
          console.log(res);
          this.roteador.navigate(['']);
        },
        err => console.log(err)
      );
    } else {
      alert('Erro');
    }
  }
*/
  // addUser(nameCompleto: string, emailUser: string, pswUser: string, cpf: string, dataNasc: string)
  public addUser(frm: FormGroup): void {

    // nameCompleto.value, emailUser.value, nameUser.value, pswUser.value, emailUser.value, cpf.value, dataNasc.values
    this.formData.append('icon', this.img, this.img.name);
    this.formData.append('nameComplete', this.usuario.nameComplete);
    this.formData.append('email', this.usuario.email);
    this.formData.append('password', this.usuario.password);
    this.formData.append('cpf', this.usuario.cpf);
    this.formData.append('dataNasc', this.usuario.dataNasc);
    // const newUser = new UserModel(nameCompleto, emailUser, pswUser, cpf, dataNasc, this.img);
    try {
    console.log(this.formData);
    this.service.register(this.formData).subscribe(
      res => {
        console.log(res);
        this.roteador.navigate(['']);
      },
      err => alert(err)
    );
    } catch (error) {
      alert(error);
    }

  }

}

