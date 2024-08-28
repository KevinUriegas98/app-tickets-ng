import { ApiResponse } from "@Models/Response";

export interface TicketInsertRequest {
    Usuario_Registra: number;
    Ticket_Tipo: number;
    Modulo_Id: number;
    Ticket_Descripcion: string;
    Ticket_Estatus: number;
};
