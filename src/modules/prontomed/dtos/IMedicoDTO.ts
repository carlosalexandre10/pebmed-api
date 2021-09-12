export interface IIncluiMedicoDTO {
  nome: string;
  crm: number;
  senha: string;
}

export interface IListaMedicoDTO {
  id: string;
  nome: string;
  crm: number;
}

export interface IAutenticaMedicoDTO {
  crm: number;
  senha: string;
}
