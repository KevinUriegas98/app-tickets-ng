import { ApiResponse } from "@Models/Response";

export interface SistemaInsertRequest {
    Sistema_Nombre: string;
    Sistema_Estatus: number;
    Usuario_Registra: number;
    Tipo_Id: number;
}

export interface SistemaUpdateRequest {
    Sistema_Id: number;
    Sistema_Nombre: string;
    Sistema_Estatus: number;
    Usuario_Registra: number;
    Tipo_Id: number;
}

export type GetSistemasResponse = ApiResponse<SistemaModel[]>;

export interface SistemaModel {
    Sistema_Id: number;
    Sistema_Nombre: string;
    Sistema_Estatus: number;
    Usuario_Registra: string;
    Fecha_Registro: string;
    Tipo_Id: number;
    Tipo_Descripcion: string;
}
