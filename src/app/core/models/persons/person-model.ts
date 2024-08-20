import {ApiResponse} from '@Models/Response';

export interface PersonInsertRequest {
    Id: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
}

export type GetPersonasResponse = ApiResponse<GetPersonasResponseData>;

interface GetPersonasResponseData {
    data: PersonaModel[];
}
  
export interface PersonaModel {
    Id: number;
    IdUsuario: number;
    Nombre: string;
    ApPaterno: string;
    ApMaterno: string;
}