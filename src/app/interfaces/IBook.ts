export interface IBook {
    id?: number;
    position?: number;
    name: string;
    description?: string;
    imageUrl?: string;
    isbn?: string;
    pages?: number;
    publishDate?: Date;
    publisher?: string;
}

export interface ISaga {
    id?: number;
    name: string;
}

export interface IBookForApproval {
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

export interface IBookToPublicList {
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