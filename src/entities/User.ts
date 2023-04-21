export interface User {
  id: number
  code: string
  phoneNumber: string
  name: string
  email?: string
  gender?: number | null
  address?: string | null
  avatar?: string,
  isLoggedIn: boolean,
  birthday: string
  status: number
  totalPost: number
}