export interface IBook { //General book
    id?: number;
    position?: number;
    name: string;
    description?: string;
    imageUrl?: string;
    isbn?: string;
    pages?: number;
    publishDate?: Date;
    publisher?: string;
    genres?: IGenre[];
}

export interface ISaga { // General saga
    id?: number;
    name: string;
    action?: any;
}

export interface IBookForApproval { // Book data for approval
    id: number;
    name: string;
    description: string;
    pages: number;
    publishDate: Date;
    publisher: string;
    imageUrl: string;
    isbn: string;
    notes: string;
    references1: string;
    references2: string;
    sagaName: string;
    authorName: string;
}

export interface IBookToPublicList { // Book data to user list
    id: number;
    name: string;
    imageUrl: string;
    sagaName: string;
    comment: string;
    score: number;
    status: string;
    pagesReaded: number;
    totalPages: number;
}

export interface IGenre { // General genre
    genre: string;
}

export interface IComment { // General comment
    comment: string;
    username: string;
    rating: number;
    status: string;
}