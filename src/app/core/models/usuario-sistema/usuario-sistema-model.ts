import { ApiResponse } from "@Models/Response";

export interface UsuarioSistemaInsertRequest{
    Sistema_Id: number;
    Usuario_Id: number;
    Estatus: number;
}

export type GetUsuarioSistemaResponse = ApiResponse<UsuarioSistemaModel[]>;


export interface UsuarioSistemaUpdateRequest{
    Id: number;
    Sistema_Id: number;
    Usuario_Id: number;
    Estatus: number;
}
export interface UsuarioSistemaModel {
    Id: number;
    Sistema_Id: number;
    Usuario_Id: number;
    Sistema: string;
    Usuario: string;
    Estatus: number;
}
