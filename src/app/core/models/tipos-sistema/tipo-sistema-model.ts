import { ApiResponse } from "@Models/Response";

export type GetTiposSistemaResponse = ApiResponse<TipoSistemaModel[]>

export interface TipoSistemaModel {
    TipoSistema_Id: number
    TipoSistema_Descripcion: string
}
