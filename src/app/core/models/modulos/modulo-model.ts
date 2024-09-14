import { ApiResponse } from "@Models/Response";

export interface ModuloInsertRequest {
    Sistema_Id: number;
    Modulo_Nombre: string;
    Modulo_Estatus: number;
    Usuario_Registra: number;
}

export interface ModuloUpdateRequest {
    Modulo_Id: number;
    Sistema_Id: number;
    Modulo_Nombre: string;
    Modulo_Estatus: number;
    Usuario_Registra: number;
}

export type GetModulosResponse = ApiResponse<ModuloModel[]>;

export interface ModuloModel {
    Modulo_Id: number;
    Sistema_Id: number;
    Sistema_Nombre: string;
    Modulo_Nombre: string;
    Modulo_Estatus: number;
    Usuario_Registra: string;
    Fecha_Registro: string;
}
