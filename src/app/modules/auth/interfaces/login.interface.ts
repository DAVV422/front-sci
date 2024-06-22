import { Usuario } from "../interfaces/response/usuario.interface";

export interface Login {
  accessToken: string;
  User: Usuario;
}
