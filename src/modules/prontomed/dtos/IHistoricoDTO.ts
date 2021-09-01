export default interface IHistoricoDTO {
  medico_id: string;
  dataConsulta: Date;
  anotacaoConsulta: string;
  nomePaciente: string;
  telefonePaciente: number;
  emailPaciente: string;
  dataNascimentoPaciente: Date;
  sexoPaciente: number;
  alturaPaciente: number;
  pesoPaciente: number;
}
