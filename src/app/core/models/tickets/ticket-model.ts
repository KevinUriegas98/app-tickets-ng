import { ApiResponse } from "@Models/Response";

export interface TicketInsertRequest {
    Usuario_Registra: number;
    Ticket_Tipo: number;
    Modulo_Id: number;
    Ticket_Descripcion: string;
    Ticket_Estatus: number;
};

export type TicketEstatusResponse = ApiResponse<TicketEstatusModel[]>;

export interface TicketEstatusModel
{
    Ticket_Id: number;
    Ticket_Descripcion: string;
    Ticket_Fecha: string;
    Modulo_Nombre: string;
    Sistema_Nombre: string;
    Estatus_Nombre: string;
    Usuario_Registra: string;
    Usuario_Asignado: string;

}
