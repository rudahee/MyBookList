import { IBook } from './IBook';

export interface IUser {
    id?: number;
    name: string;
    surname: string;
    age: number;
    username: string;
    password: string;
    gender?: string;
    email: string;
    createTime: Date;
    updateTime: Date;
    lastPasswordChange: Date;
    roles: string;
    imageProfile?: string;
    enableAccount?: boolean;
}

export interface IAuthorSimple {
    id?: number;
    completeName?: string;
    imageUrl?: string;
}

export interface IPublicAuthor {
    id?: number;
    name: string;
    surname: string;
    age: number;
    username: string;
    email: string;
    roles: string;
    urlImage?: string;
    biography: string;
    books: IBook[];
}


export interface ILoginData {
    username: string;
    password: string;
}

export interface IActivateAccount {
    activationCode: string;
    id: number;
}

export interface IFriendRequest {
    id?: number;
    requesterName?: string;
    requesterId?: string;
    accepted?: boolean;
}


