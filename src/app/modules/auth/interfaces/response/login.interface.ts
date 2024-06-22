export interface Rol {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface Usuario{
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  last_name: string;
  birthdate: Date;
  url_image: string;
  cellphone: string;
  grade: string;
  email: string;
  role: string;
}

export interface User_Created{  
  name: string;
  last_name: string;
  birthdate: Date;
  cellphone: string;
  grade: string;
  email: string;
  password: string;  
  role: string;
  url_image?: string;
}

export interface DataLogin{
  accessToken: string;
  User: Usuario;
}
export interface Login {
  data: DataLogin
}
