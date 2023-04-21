export interface Author {
    id: number,
    code: string,
    name: string,
    avatar?: string,
    email: string,
    phoneNumber: string,
    score: number,
    totalPost: number,
    address?: string
}