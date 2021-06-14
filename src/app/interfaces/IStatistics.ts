import { IGenre } from './IBook';

export interface IStatisticsUser {
    totalBooksRead?: number;
    totalBooksThisYear?: number;
    totalPagesRead?: number;
    totalPagesThisYear?: number;
    hoursRead?: number;
    minutesRead?: number;
    daysRead?: number;
    mostReadGenre?: IGenre;
    mostReadAuthor?: string;
    meanScore?: number;
}

export interface IStatisticsAuthor {
    qtyUserReadBooks: number;
    qtyUserDroppedBooks: number;
    meanScore: number;

    lastBook: string;
    qtyUserReadLastBook: number;
    qtyUserDroppedLastBook: number;
    meanScoreLastBook: number;

    mostReadBook: string;
    qtyUserReadMostReadBook: number;
    qtyUserDroppedMostReadBook: number;
    meanScoreMostReadBook: number;

    mostRatedBook: string;
    qtyUserReadMostRatedBook: number;
    qtyUserDroppedMostRatedBook: number;
    meanScoreMostRatedBook: number;

    qtyFollowers: number;
    femaleFollowers: number;
    maleFollowers: number;
    meanAgeFollowers: number;
}

export interface IStatisticsAdmin {
    userRegisters: number;
    authorsRegisters: number;
    adminRegisters: number;
    newUsersRegistersThisMonth: number;
    booksWritten: number;
    mostReadGenre: IGenre;
    meanAgeFromUserRegisters: number;
    qtyMaleUsersRegisters: number;
    qtyFemaleUsersRegisters: number;
}
