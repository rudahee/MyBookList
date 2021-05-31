import { IJwt } from './../../interfaces/IJwt';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerService {

  constructor() { }

  saveJWT(token: string): void {
    localStorage.setItem('jwt', token);
    const tokenDecode: IJwt = jwt_decode(token);
    localStorage.setItem('user_id', tokenDecode.jti);

  }

  getJWT(): string {
    return localStorage.getItem('jwt');
  }

  getUID(): string {
    return localStorage.getItem('user_id');
  }

  deleteJWT(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('jwt');
    location.href = '/';
  }
}
