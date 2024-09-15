import { ApiResponse } from "@Models/Response";

export interface SistemaInsertRequest {
    Sistema_Nombre: string;
    Sistema_Estatus: number;
    Usuario_Registra: number;
    Sistema_Tipo: number;
}

export interface SistemaUpdateRequest {
    Sistema_Id: number;
    Sistema_Nombre: string;
    Sistema_Estatus: number;
    Usuario_Registra: number;
    Sistema_Tipo: number;
}

export type GetSistemasResponse = ApiResponse<SistemaModel[]>;

export interface SistemaModel {
    Sistema_Id: number;
    Sistema_Nombre: string;
    Sistema_Estatus: number;
    Usuario_Registra: string;
    Fecha_Registro: string;
    Sistema_Tipo: number;
}
