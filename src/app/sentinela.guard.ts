import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class SentinelaGuard implements CanActivate {
  constructor(
    private service: LoginService,
    private roteador: Router) {}

  canActivate(): boolean {
    if (this.service.logged()){
      return true;
    } else {
      this.roteador.navigate(['']);
      return false;
    }
  }
}
