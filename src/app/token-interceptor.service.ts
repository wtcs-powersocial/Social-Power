import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    const service = this.injector.get(LoginService);
    const tokenizedReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${service.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
