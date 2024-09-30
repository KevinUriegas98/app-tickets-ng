import { ApiResponse } from "@Models/Response";

export type GetUsuariosResponse = ApiResponse<UsuarioModel[]>;
export interface UsuarioModel {
    Id: number;
    NombreUsuario : string;
}
