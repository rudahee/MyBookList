export interface IUser {
    id?: number;
    name: string;
    surname: string;
    age: number;
    username: string;
    password: string;
    email: string;
    createTime: Date;
    updateTime: Date;
    lastPasswordChange: Date;
    roles: string;
}


export interface ILoginData {
    username: string;
    password: string;
}

export interface IActivateAccount {
    activationCode: string;
    id: number;
}