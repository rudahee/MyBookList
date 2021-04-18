import { IActivateAccount } from './../../interfaces/IUser';
import { ActivateAccountComponent } from './../../modules/@public/activate-account/activate-account.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginData, IUser } from 'src/app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpC: HttpClient) { }

  signUp(userForRegister: IUser): Observable<IUser> {
    return this.httpC.post<IUser>('/user/sign-up', userForRegister);
  }

  signIn(loginData: ILoginData): Observable<HttpResponse<ILoginData>> {
    return this.httpC.post<ILoginData>('/user/sign-in', loginData, {observe: 'response'});
  }

  activateAccount(token: string, id: string): void {
    const activation: IActivateAccount = {
      activationCode: token,
      id: +id
    };

    console.log(activation);

    this.httpC.put('/user/activate', activation).subscribe(
      res => {
        console.log(res)
      }
    );
 }

 getPrivateUserInfo(): Observable<IUser> {
   return this.httpC.get<IUser>('/user/me');
  }
}
