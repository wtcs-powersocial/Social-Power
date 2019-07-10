import { AngularFireUploadTask,
  AngularFireStorageReference,
  AngularFireStorage } from 'angularfire2/storage';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { LoginService } from '../../login.service';
import { UserModel } from '../../shared/user.model';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css'],
  providers: [LoginService]
})
export class NewLoginComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;
  caminhoImagem: string;
  ref: AngularFireStorageReference;
  trava: boolean;
  inscrito: Subscription;
  img_denuncia: File;
  usuario: any;
  formData = new FormData();

  constructor(
    private service: LoginService,
    private roteador: Router,
    private afStorage: AngularFireStorage) {
  }

  ngOnInit() {
    this.usuario = {};
    this.trava = false;
  }

  public uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      this.img_denuncia = event.target.files[0];
    } else {
      console.log('Nenhum arquivo foi selecionado.');
    }
  }

  public addUser(): void {

    if (!this.trava) {
      this.trava = true;
      this.setUpload();
    }

    if (this.caminhoImagem) {
      this.populationFormData();
      try {
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
      } else {
        console.log('Aguardando o Firebase...');
      }
    }

  async setUpload() {
    const nameImgFirebase = Date.now() + this.img_denuncia.name;
    const path = `users/${nameImgFirebase}`;
    const fileRef = this.afStorage.ref(path.replace(/\s/g, ''));
    this.task = this.afStorage.upload(path.replace(/\s/g, ''), this.img_denuncia);
    await this.task.then( async up => {
        await fileRef.getDownloadURL().subscribe(url => {
        this.complete = true;
        this.caminhoImagem = url;

      });
    });
    this.uploadPercent = this.task.percentageChanges();
  }


  private populationFormData(): void {
    this.formData.append('icon', this.caminhoImagem);
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

