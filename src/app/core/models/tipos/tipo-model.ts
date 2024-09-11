
import { ApiResponse } from "@Models/Response";

export type GetTiposTicketResponse = ApiResponse<TipoTicketModel[]>

export interface TipoTicketModel 
{
    Tipo_Id: number;
    Tipo_Nombre: string;
    Tipo_Estatus: number;
}
