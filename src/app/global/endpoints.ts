import { environment } from './../../environments/environment';

export const auth = {
  login: `${environment.urlBase}SignIn`,
};

export const persons = {
  get: `${environment.urlBase}GetUsuarios`,
  insert: `${environment.urlBase}InsertPersona`,
};

export const profiles = {
  get: `${environment.urlBase}GetPerfiles`
};

export const stores = {
  get: `${environment.urlBase}GetSucursales`
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