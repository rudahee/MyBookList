import { IActivateAccount, IAuthorSimple, IFriendRequest, IPublicAuthor } from './../../interfaces/IUser';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginData, IUser } from 'app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpC: HttpClient) { }

  signUp(userForRegister: IUser): Observable<IUser> {
    return this.httpC.post<IUser>('/user/sign-up', userForRegister);
  }

  signUpAuthor(register: IUser): Observable<IUser> {
    return this.httpC.post<IUser>('/user/sign-up/author', register);
  }

  signUpAdmin(register: IUser): Observable<IUser> {
    return this.httpC.post<IUser>('/user/sign-up/admin', register);
  }

  signIn(loginData: ILoginData): Observable<HttpResponse<ILoginData>> {
    return this.httpC.post<ILoginData>('/user/sign-in', loginData, {observe: 'response'});
  }

  activateAccount(token: string, id: string): Observable<any> {
    const activation: IActivateAccount = {
      activationCode: token,
      id: +id
    };

    return this.httpC.put('/user/activate', activation);
  }

  friendshipRequest(receiverId: string): Observable<any> {
    return this.httpC.put<any>('/friend/request/' + receiverId, null);
  }

  getFriendships(): Observable<IFriendRequest[]> {
    return this.httpC.get<IFriendRequest[]>('/friend');
  }

  getFollowedAuthor(): Observable<IAuthorSimple[]> {
    return this.httpC.get<IAuthorSimple[]>('/author/followed');
  }

  acceptFriendship(id: string): Observable<any> {
    return this.httpC.put<any>('/friend/accept/' + id, null);
  }

  rejectFriendship(id: string): Observable<any> {
    return this.httpC.delete<any>('/friend/reject/' + id);
  }

  followAuthor(id: string): Observable<any> {
    return this.httpC.put<any>('/author/follow/' + id, null);
  }

 getPrivateUserInfo(): Observable<IUser> {
   return this.httpC.get<IUser>('/user/me');
  }

  getPublicUserInfo(id: string): Observable<IUser> {
    return this.httpC.get<IUser>('/user/' + id);
  }

  getPublicAuthorInfo(id: string): Observable<IPublicAuthor> {
    return this.httpC.get<IPublicAuthor>('/author/public/' + id);
  }

  getAllAuthors(): Observable<IUser[]> {
    return this.httpC.get<IUser[]>('/author/all');
  }
}
