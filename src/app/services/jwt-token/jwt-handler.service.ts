import { IJwt } from './../../interfaces/IJwt';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerService {

  constructor() { }

  /**
   * Save all data from json web token in local storage
   *
   * @param {string} token
   * @memberof JwtHandlerService
   */
  saveJWT(token: string): void {
    localStorage.setItem('jwt', token);
    const tokenDecode: IJwt = jwt_decode(token);
    localStorage.setItem('user_id', tokenDecode.jti);
    localStorage.setItem('rol', tokenDecode.roles[0]);
  }

  getJWT(): string {
    return localStorage.getItem('jwt');
  }

  getUID(): string {
    return localStorage.getItem('user_id');
  }

  /**
   * Delete all data from local storage
   */
  deleteJWT(): void {
    localStorage.removeItem('user_id');
    localStorage.removeItem('jwt');
    localStorage.removeItem('rol')
    location.href = '/';
  }
}
