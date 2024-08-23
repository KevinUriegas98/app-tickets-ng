import { ApiResponse } from "@Models/Response";

export interface EstatusTicketInsertRequest {
    Estatus_Nombre: string;
    Estatus_Activo: number;
}

export type GetEstatusTicketsResponse = ApiResponse<EstatusTicketModel[]>;

// interface GetEstatusTicketsResponseData {
//     data: EstatusTicketModel[];
// }

export interface EstatusTicketModel {
    Estatus_Id: number;
    Estatus_Nombre: string;
    Estatus_Activo: number;
}
