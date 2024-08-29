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
  insert: `${environment.urlBase}InsertTicket`
}

export const sistemas = {
  get: `${environment.urlBase}GetAllSistemas`
}

export const modulos = {
  get: `${environment.urlBase}GetAllModulos`
}