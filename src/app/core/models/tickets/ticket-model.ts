import { ApiResponse } from "@Models/Response";

export interface TicketInsertRequest {
    Usuario_Registra: number;
    Ticket_Tipo: number;
    Modulo_Id: number;
    Ticket_Descripcion: string;
    Ticket_Comentarios: string;
    Ticket_Titulo: string;
    Ticket_Estatus: number;
    
};

export interface TicketUpdateRequest{
    Ticket_Id: number;
    Usuario_Registra: number;
    Usuario_Asignado: number;
    Ticket_Tipo: number;
    Modulo_Id: number;
    Ticket_Descripcion: string;
    Ticket_Comentarios: string;
    Ticket_Titulo: string;
    Ticket_Estatus: number;
}

export type TicketEstatusResponse = ApiResponse<TicketEstatusModel[]>;

export interface TicketEstatusModel
{
    Ticket_Id: number;
    Ticket_Titulo: string;
    Ticket_Descripcion: string;
    Ticket_Comentarios: string;
    Ticket_Fecha: string;
    Tipo_Ticket_Id: number;
    Tipo_Ticket_Nombre: string;
    Modulo_Nombre: string;
    Sistema_Nombre: string;
    Estatus_Id: number;
    Estatus_Nombre: string;
    Usuario_Registra: string;
    Usuario_Asignado: string;
    Adjuntos: AdjuntoModel[];
}

interface AdjuntoModel
{
    FileName: string;
    Format: string;
}
