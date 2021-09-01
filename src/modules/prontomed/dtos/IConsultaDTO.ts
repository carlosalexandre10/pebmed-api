export interface IIncluiConsultaDTO {
  paciente_id: string;
  data: Date;
  anotacao?: string;
}

export interface IIncluiAnotacaoConsultaDTO {
  id: string;
  anotacao: string;
}
