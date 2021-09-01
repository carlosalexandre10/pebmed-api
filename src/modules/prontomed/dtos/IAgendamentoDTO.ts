export interface IIncluiAgendamentoDTO {
  paciente_id: string;
  data: Date;
}

export interface IAlteraAgendamentoDTO {
  id: string;
  paciente_id: string;
  data: Date;
}
