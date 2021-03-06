export interface User {
  _id: string,
  firstName: string,
  name: string,
  email: string,
  password: string,
  role: string,
  createdAt: Date
}

export interface UserState {
  token: string,
  expiresIn: number,
  infos: Partial<User>
}
