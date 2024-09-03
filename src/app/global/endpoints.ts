import { environment } from './../../environments/environment';

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const estatusTickets = {
  get: `${environment.urlBase}GetAllEstatus`,
  insert: `${environment.urlBase}InsertEstatus`,
  update: `${environment.urlBase}UpdateEstatus`,
  delete: `${environment.urlBase}DeleteEstatus`,
}

export const tickets = {
  insert: `${environment.urlBase}InsertTicket`,
  get: `${environment.urlBase}GetTicketEstatus`,
  update:`${environment.urlBase}UpdateTicket`
}

export const sistemas = {
  insert: `${environment.urlBase}InsertSistema`,
  get: `${environment.urlBase}GetAllSistemas`,
  update: `${environment.urlBase}UpdateSistema`,
  delete: `${environment.urlBase}DeleteSistema`
}

export const modulos = {
  get: `${environment.urlBase}GetAllModulos`,
  insert: `${environment.urlBase}InsertModulo`,
  update: `${environment.urlBase}UpdateModulo`,
  delete: `${environment.urlBase}DeleteModulo`
}