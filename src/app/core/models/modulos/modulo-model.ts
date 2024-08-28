import { ApiResponse } from "@Models/Response";

export type GetModulosResponse = ApiResponse<ModuloModel[]>;

export interface ModuloModel {
    Modulo_Id: number;
    Sistema_Id: number;
    Modulo_Nombre: string;
    Modulo_Estatus: number;
    Usuario_Registra: number;
    Fecha_Registro: string;
}
