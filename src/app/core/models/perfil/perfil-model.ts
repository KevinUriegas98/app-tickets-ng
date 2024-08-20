import {ApiResponse} from '@Models/Response';

export interface PerfilInsertRequest {
    Id: number;
    Nombre: string;
    Descripcion: string;
}

export type GetPerfilResponse = ApiResponse<GetPerfilResponseData>;

interface GetPerfilResponseData {
    data: PerfilModel[];
}
  
export interface PerfilModel {
    Id: number;
    Nombre: string;
    Descripcion: string;
}