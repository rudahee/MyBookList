import { JwtHandlerService } from './../jwt-token/jwt-handler.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  // DEV
  urlBack = 'http://localhost:8080';
  // PROD
  //urlBack = 'http://mybooklist.site:8080';


  constructor(private jwtHandler: JwtHandlerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.jwtHandler.getJWT();

    if (token) { // If exists token put in request
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    if (!token) { // If doesn't exist allows access to the Authorization header
      request = request.clone({ headers: request.headers.set('Access-Control-Expose-Headers', 'Authorization')});
    }

    // Always will communicate with 'application/json' type.
    request = request.clone({headers: request.headers.set('Accept', 'application/json')});


    const url = {url: this.urlBack + request.url};
    request = Object.assign(request, url);
    const urlWithParams = {urlWithParams: this.urlBack + request.urlWithParams};
    request = Object.assign(request, urlWithParams);

    return next.handle(request).pipe(

      map((event: HttpEvent<any>) => {
        return event;
      }),
      finalize(() => {

      })
      );
    }
}
