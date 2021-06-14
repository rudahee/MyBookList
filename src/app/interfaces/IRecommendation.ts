/*
* Types:
* 0 - Your favorite genre
* 1 - Your Friends books
* 2 - Your Authors books
* 3 - Books for random author
* 4 - Books totally random, discover something new!
*/

export interface IRecommendation {
    type: number;
    sentence: string;
    books: IBookForRecommendation[];
}

export interface IBookForRecommendation {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}
