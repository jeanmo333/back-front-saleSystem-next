export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  telefono: string;
  web: string;
  isActive: boolean;
  token: string;

  createdAt?: string;
  updatedAt?: string;
}
