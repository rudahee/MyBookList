export interface IJwt { //Info necesary from json web token.
    jti: string;
    email: string;
    roles: string[];
}
