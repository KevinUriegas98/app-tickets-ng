import { ApiResponse } from "@Models/Response";

export type GetSistemasResponse = ApiResponse<SistemaModel[]>;

export interface SistemaModel {
    Sistema_Id: number;
    Sistema_Nombre: string;
    Sistema_Estatus: number;
    Usuario_Registra: number;
    Fecha_Registro: string;
    Sistema_Tipo: number;
}
