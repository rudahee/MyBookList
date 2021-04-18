export interface IBook {
    position: number;
    name: string;
    description?: string;
    imageUrl?: string;
    isbn: string;
    pages?: number;
    publishDate?: Date;
    publisher: string;
}
