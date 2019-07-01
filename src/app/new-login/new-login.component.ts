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

  constructor(private service: LoginService, private roteador: Router) {
  }

  ngOnInit() {
    this.usuario = {};
  }

  public uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.img = event.target.files[0];
    } else {
      console.log('Nenhum arquivo foi selecionado.');
    }
  }

  public addUser(): void {
    this.populationFormData();
    try {
    console.log(this.formData);
    this.service.register(this.formData).subscribe(
      res => this.roteador.navigate(['']),
      err => {
        console.log(err);
        alert(err.error.msg);
      }
    );
    } catch (error) {
      alert('Erro: não foi possível cadastrar usuário');
      console.log(error);
    }
    this.clearFormData();
  }

  private populationFormData(): void {
    this.formData.append('icon', this.img, this.img.name);
    this.formData.append('nameComplete', this.usuario.nameComplete);
    this.formData.append('email', this.usuario.email);
    this.formData.append('password', this.usuario.password);
    this.formData.append('cpf', this.usuario.cpf);
    this.formData.append('dataNasc', this.usuario.dataNasc);
  }
  private clearFormData(): void {
    this.formData.delete('icon');
    this.formData.delete('nameComplete');
    this.formData.delete('email');
    this.formData.delete('password');
    this.formData.delete('cpf');
    this.formData.delete('dataNasc');
  }

}

