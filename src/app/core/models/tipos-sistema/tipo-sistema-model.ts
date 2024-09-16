import { ApiResponse } from "@Models/Response";

export interface TipoSistemaInsertRequest {
    TipoSistema_Descripcion: string
}

export type GetTiposSistemaResponse = ApiResponse<TipoSistemaModel[]>

export interface TipoSistemaModel {
    TipoSistema_Id: number
    TipoSistema_Descripcion: string
}
