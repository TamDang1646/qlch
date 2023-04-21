import {Author} from './Author';

export interface Posts {
    id: number,
    authorId: number,
    title: string,
    detail: string,
    postTime: string,
    price: number,
    minPrice: number,
    maxPrice: number,
    timeUnit: number,
    address: string,
    score: number,
    image: string,
    author: Author,
    isSave: number,
    postType: number,
    status: number,
}